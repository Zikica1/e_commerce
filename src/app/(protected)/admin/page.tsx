import React from 'react';
import OrdersCards from '../../../components/admin/OrdersCards';
import getAllOrders from '@/lib/action/getOllOrders';
import OrderTab from '@/components/admin/OrderTab';

const PageAdmin = async () => {
  const orders = await getAllOrders();

  return (
    <div>
      <h1>Order Management</h1>
      <div className='md:hidden'>
        <OrdersCards orders={orders} />
      </div>
      <div className='hidden md:block'>
        <OrderTab orders={orders} />
      </div>
    </div>
  );
};

export default PageAdmin;
