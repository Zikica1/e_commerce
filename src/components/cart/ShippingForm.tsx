'use client';

import { useEffect } from 'react';
import addShippingData from '@/lib/action/shippingAction';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { FormState } from '../../../types';

//moraš staviti type za initialState inače vidi errors kao prazan objekat
//sa FormState pokazuješ da errors unutar initailState ima polja name,email...
const initialState: FormState = {
  success: false,
  errors: {},
};

const ShippingForm = () => {
  const [state, formAction] = useActionState(addShippingData, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push('/cart?step=3', { scroll: false });
    }
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      key={state.success ? 'reset' : 'form'}
      className='flex flex-col gap-4 *:border-b *:border-gray-200 text-xs'
    >
      <div className='flex flex-col gap-1'>
        <label className='text-gray-500 font-medium' htmlFor='name'>
          Name
        </label>
        <input
          type='text'
          name='name'
          placeholder='John Doe'
          className='py-2 text-base'
        />
        {state.errors?.name && <p>{state.errors.name[0]}</p>}
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-gray-500 font-medium ' htmlFor='email'>
          Email
        </label>
        <input
          type='text'
          name='email'
          placeholder='hohndoe@gmail.com'
          className='py-2 text-base'
        />
        {state.errors?.email && <p>{state.errors.email[0]}</p>}
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-gray-500 font-medium w-full' htmlFor='phone'>
          Phone
        </label>
        <input
          type='text'
          name='phone'
          placeholder='phone'
          className='py-2 text-base'
        />
        {state.errors?.phone && <p>{state.errors.phone[0]}</p>}
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-gray-500 font-medium w-full' htmlFor='address'>
          Address
        </label>
        <input
          type='text'
          name='address'
          placeholder='123 Main St. AnyTown'
          className='py-2 text-base'
        />
        {state.errors?.address && <p>{state.errors.address[0]}</p>}
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-gray-500 font-medium w-full' htmlFor='city'>
          City
        </label>
        <input
          type='text'
          name='city'
          placeholder='New York'
          className='py-2 text-base'
        />
        {state.errors?.city && <p>{state.errors.city[0]}</p>}
      </div>
      {state.errors?.form && (
        <p className='text-red-500'>{state.errors.form[0]}</p>
      )}
      <button className='text-white bg-gray-800 hover:bg-gray-900 flex items-center justify-center gap-2 py-3 px-4 rounded-lg cursor-pointer transition-all duration-300'>
        <span>Continue</span>
        <ArrowRight className='w-4 h-4' />
      </button>
    </form>
  );
};

export default ShippingForm;
