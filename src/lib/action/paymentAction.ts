'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { paymentFormSchema } from '../validators/paymentSchema';
import createOrder from './createOrder';
import clearCart from './clearCart';

type FormStatePayment = {
  success: boolean;
  errors: {
    cardName?: string[];
    cardNumber?: string[];
    expirationDate?: string[];
    cvv?: string[];
    form?: string[];
  };
};

const getPaymentData = async (
  prevState: FormStatePayment,
  formData: FormData,
): Promise<FormStatePayment> => {
  const paymentData = {
    cardName: String(formData.get('cardName') || ''),
    cardNumber: String(formData.get('cardNumber') || ''),
    expirationDate: String(formData.get('expirationDate') || ''),
    cvv: String(formData.get('cvv') || ''),
  };

  const result = paymentFormSchema.safeParse(paymentData);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      errors: errors.fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    return {
      success: false,
      errors: {
        form: ['Cart not found'],
      },
    };
  }

  let order;

  try {
    order = await createOrder(cartId);
    await clearCart(cartId);
  } catch (error) {
    console.error('Error processing order:', error);

    return {
      success: false,
      errors: {
        form: ['Failed to process order'],
      },
    };
  }

  redirect(`/order/${order.orderId}`);
};

export default getPaymentData;
