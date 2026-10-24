'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Steps from './Steps';
import Image from 'next/image';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import { ArrowRight, Trash } from 'lucide-react';
import { ItemTypeProp } from '../../../types';
import { removeFromCart } from '@/lib/action/cartAction';
import { toast } from 'react-toastify';

const CartPageClient = ({ cart }: { cart: ItemTypeProp }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRemoveFromCart = async (
    productId: string,
    selectedSize: string,
    selectedColor: string,
  ) => {
    const result = await removeFromCart(productId, selectedSize, selectedColor);

    if (result.message) {
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  const activeStep = parseInt(searchParams.get('step') || '1');
  return (
    <section className='flex flex-col gap-8 items-center justify-center mt-12'>
      <h1 className='text-2xl font-medium'>Your Shopping Cart</h1>
      <Steps activeStep={activeStep} />
      {/* STEPS&DETAILS */}
      <div className='w-full flex flex-col lg:flex-row gap-16'>
        {/* STEP */}
        <div className='w-full lg:w-7/12 border border-gray-100 p-8 rounded-lg shadow-lg'>
          {activeStep === 1 ? (
            cart.map((item) => (
              <div key={item.product._id}>
                {/* IMAGE&INF */}
                <div className='flex items-center justify-between gap-4'>
                  {/* IMAGE */}
                  <div className='flex gap-8'>
                    <div className='relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden'>
                      <Image
                        src={item.product.images[item.selectedColor]}
                        alt={item.product.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    {/* INFO */}
                    <div className='text-sm text-gray-500 flex flex-col gap-1 *:mb-2'>
                      <h3 className='text-gray-900 font-medium'>
                        {item.product.name}
                      </h3>
                      <div>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.selectedSize}</p>
                        <p>Color: {item.selectedColor}</p>
                      </div>
                      <p className='text-gray-900 font-medium'>
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/* BUTTON-DEL */}
                  <button
                    onClick={() =>
                      handleRemoveFromCart(
                        item.product._id,
                        item.selectedSize,
                        item.selectedColor,
                      )
                    }
                    className='w-8 h-8 bg-red-100 rounded-full grid place-content-center cursor-pointer transition-all duration-300 hover:bg-red-200'
                  >
                    <Trash className='w-3 h-3 text-red-400' />
                  </button>
                </div>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm />
          ) : activeStep === 3 ? (
            <PaymentForm />
          ) : (
            <p className='text-sm text-gray-500'>
              Please fill in the shipping form to continue.
            </p>
          )}
        </div>
        {/* DETAILS */}
        <div className='border border-gray-200 rounded-lg shadow-lg w-full lg:w-5/12 flex flex-col gap-5 p-8 h-max'>
          <h3 className='text-base font-medium'>Cart Details</h3>
          <ul className='*:mb-4 text-sm *:text-gray-500 border-b border-gray-200'>
            <li className='flex items-center justify-between'>
              <span>Subtotal</span>
              <span className='text-black font-medium'>
                $
                {cart
                  .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='flex items-center justify-between'>
                Discount(10%)
              </span>
              <span className='text-black font-medium'>{`$10`}</span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='flex items-center justify-between'>
                Shipping Fee
              </span>
              <span className='text-black font-medium'>{`$10`}</span>
            </li>
          </ul>
          <div className='flex items-center justify-between'>
            <span className='text-gray-900 font-medium'>Total</span>
            <span className='text-black font-medium'>
              $
              {cart
                .reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0,
                )
                .toFixed(2)}
            </span>
          </div>
          {/* BUTTON DEL */}
          {activeStep === 1 && (
            <button
              onClick={() => router.push('/cart?step=2', { scroll: false })}
              className='flex items-center gap-1 justify-center py-2 px-4 bg-gray-800 hover:bg-gray-900 rounded-lg text-white cursor-pointer transition-all duration-300'
            >
              <span>Continue</span>
              <ArrowRight className='w-3 h-3' />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPageClient;
