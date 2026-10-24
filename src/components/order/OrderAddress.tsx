import { MapPin } from 'lucide-react';
import { ShippingAddress } from '../../../types';

const OrderAddress = ({ address }: { address: ShippingAddress }) => {
  return (
    <section className='p-4 flex flex-col gap-4 ring ring-gray-300 rounded-md'>
      <div className='flex gap-4'>
        <MapPin />
        <h3 className='font-medium text-xl'>Shipping Address</h3>
      </div>
      <div className='*:mb-1.5 *:text-black/80'>
        <p className='capitalize'>{address.name}</p>
        <p>{address.email}</p>
        <p>{address.phone}</p>
        <p>{address.address}</p>
        <p>{address.city}</p>
      </div>
    </section>
  );
};

export default OrderAddress;
