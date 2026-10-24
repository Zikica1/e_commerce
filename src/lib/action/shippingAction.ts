'use server';

import { z } from 'zod';
import Cart from '../models/Cart';
import { shippingFormSchema } from '../validators/shippingSchema';
import connectDB from '../connectDB';
import { FormState } from '../../../types';
import { cookies } from 'next/headers';

const addShippingData = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const shippingData = {
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    phone: String(formData.get('phone') || ''),
    address: String(formData.get('address') || ''),
    city: String(formData.get('city') || ''),
  };

  const result = shippingFormSchema.safeParse(shippingData);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      errors: errors.fieldErrors,
    };
  }

  await connectDB();

  const data = result.data;

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

  //ovde abdetujem postojeću cart, poadaci shipping se nalaze u cart/shippingAddress
  try {
    await Cart.findOneAndUpdate(
      { cartId },
      {
        shippingAddress: data,
      },
    );
  } catch (err) {
    console.error(err);
    return {
      success: false,
      errors: {
        form: ['error, data not sent'],
      },
    };
  }

  return {
    success: true,
    errors: {},
  };
};

export default addShippingData;
