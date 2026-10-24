'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useActionState } from 'react';
import getPaymentData from '@/lib/action/paymentAction';
import { FormStatePayment } from '../../../types';

const initialState: FormStatePayment = {
  success: false,
  errors: {},
};

const PaymentForm = () => {
  const [state, formAction] = useActionState(getPaymentData, initialState);

  return (
    <form
      action={formAction}
      key={state.success ? 'reset' : 'form'}
      className='flex flex-col gap-4 *:border-b *:border-gray-200 text-xs'
    >
      <div className='flex flex-col gap-1'>
        <label className='text-gray-500 font-medium' htmlFor='cardHolder'>
          Name on card
        </label>
        <input
          type='text'
          name='cardName'
          placeholder='John Doe'
          className='py-2 text-base'
        />
        {state.errors.cardName && (
          <p className='text-red-500'>{state.errors.cardName[0]}</p>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-gray-500 font-medium ' htmlFor='cardNumber'>
          Card Number
        </label>
        <input
          type='text'
          name='cardNumber'
          placeholder='456987'
          className='py-2 text-base'
        />
        {state.errors.cardNumber && (
          <p className='text-red-500'>{state.errors.cardNumber[0]}</p>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <label
          className='text-gray-500 font-medium w-full'
          htmlFor='expirationDate'
        >
          Expiration Date
        </label>
        <input
          type='text'
          name='expirationDate'
          placeholder='01/32'
          className='py-2 text-base'
        />
        {state.errors.expirationDate && (
          <p className='text-red-500'>{state.errors.expirationDate[0]}</p>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-gray-500 font-medium w-full' htmlFor='cvv'>
          CVV
        </label>
        <input
          type='text'
          name='cvv'
          placeholder='123'
          className='py-2 text-base'
        />
        {state.errors.cvv && (
          <p className='text-red-500'>{state.errors.cvv[0]}</p>
        )}
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Image
          src='/klarna.png'
          alt='klarna'
          width={50}
          height={25}
          className='rounded-md'
        />
        <Image
          src='/cards.png'
          alt='cards'
          width={50}
          height={25}
          className='rounded-md'
        />
        <Image
          src='/stripe.png'
          alt='stripe'
          width={50}
          height={25}
          className='rounded-md'
        />
      </div>
      <button className='text-white bg-gray-800 hover:bg-gray-900 flex items-center justify-center gap-2 py-3 px-4 rounded-lg cursor-pointer transition-all duration-300'>
        <span>Checkout</span>
        <ShoppingCart className='w-4 h-4' />
      </button>
    </form>
  );
};

export default PaymentForm;
