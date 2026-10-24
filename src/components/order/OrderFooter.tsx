import { orderFooter } from '@/data/db';
import OrderFooIcon from './OrderFooIcon';

const OrderFooter = () => {
  return (
    <section className='border border-gray-300 p-4 rounded-md'>
      <ul className='flex items-center justify-between'>
        {orderFooter.map((item) => (
          <li
            className='text-center lg:flex lg:text-left lg:gap-4'
            key={item.title}
          >
            <OrderFooIcon orderFooItems={item} />
            <div>
              <h3 className='font-medium mt-2'>{item.title}</h3>
              <p className='md:hidden text-black/60 font-medium'>
                {item.conMob}
              </p>
              <p className='hidden md:block text-black/60 max-w-3/4'>
                {item.con}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrderFooter;
