'use client';

import { useState } from 'react';
import { Order } from '../../../types';
import { CircleCheck } from 'lucide-react';
import OrderHeader from './OrderHeader';
import OrderItems from './OrderItems';
import Panel from './Panel';
import OrderAddress from './OrderAddress';
import OrderSummary from './OrderSummary';
import OrderFooter from './OrderFooter';

const OrderPageClient = ({ order }: { order: Order }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className='py-9 flex flex-col gap-6'>
      <div className='flex gap-3 items-start'>
        <CircleCheck className='w-8 h-8 text-green-700' />
        <div>
          <h1 className='text-2xl font-medium leading-none mb-2'>
            Order Details
          </h1>
          <p>Tank you, your order has been placed successfully</p>
        </div>
      </div>
      <OrderHeader
        orderId={order.orderId}
        date={order.createdAt}
        payStatus={order.paymentStatus}
        total={order.total}
      />
      <div className='grid gap-6 lg:grid-cols-[60%_1fr]'>
        <OrderItems order={order} />
        <Panel
          title='Shipping Address'
          isActive={activeIndex === 0}
          onShown={() => setActiveIndex(activeIndex === 0 ? null : 0)}
        >
          <OrderAddress address={order.shippingAddress} />
        </Panel>
        <Panel
          title='Order Summary'
          isActive={activeIndex === 1}
          onShown={() => setActiveIndex(activeIndex === 1 ? null : 1)}
        >
          <OrderSummary total={order.total} />
        </Panel>
      </div>
      <OrderFooter />
    </main>
  );
};

export default OrderPageClient;
