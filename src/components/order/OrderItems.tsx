import Image from 'next/image';
import { Order } from '../../../types';

const OrderItems = ({ order }: { order: Order }) => {
  return (
    <section className='lg:row-span-2'>
      <ul className='ring ring-gray-300 rounded-lg'>
        <li className='p-4 rounded-tl-lg rounded-tr-lg ring ring-gray-300'>
          <h2 className='font-bold'>Items ({order.items.length})</h2>
        </li>
        {order.items.map((item) => (
          <li
            className='last:rounded-bl-lg last:rounded-br-lg border-b border-b-gray-300 last:border-b-0'
            key={item.productId}
          >
            <div className='md:hidden flex gap-4 p-4'>
              <div className='relative w-25 h-20 overflow-hidden rounded-md'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  loading='eager'
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col w-full gap-2'>
                <h3 className='text-lg font-medium'>{item.name}</h3>
                <div className='flex items-center gap-1'>
                  <span className='capitalize'>{item.selectedColor}</span>
                  <span className='inline-block w-1 h-1 bg-black rounded-full'></span>
                  <span>{item.selectedSize}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Qty:{item.quantity}</span>
                  <span className='font-semibold'>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className='hidden md:block p-4'>
              <div className='relative w-25 h-20 overflow-hidden rounded-md'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  loading='eager'
                  className='object-cover'
                />
              </div>

              <div>
                <h3>{item.name}</h3>
                <ul className='flex items-center md:justify-between gap-4'>
                  <li>Color: {item.selectedColor}</li>
                  <li>Size: {item.selectedSize}</li>
                  <li>Qty: {item.quantity}</li>
                </ul>
                <p className='font-medium'>${item.price.toFixed(2)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrderItems;
