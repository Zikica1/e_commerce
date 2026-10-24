import { OrderFoo } from '../../../types';

const OrderFooIcon = ({ orderFooItems }: { orderFooItems: OrderFoo }) => {
  const Icon = orderFooItems.Icon;

  return <Icon className='m-auto text-black/60' />;
};

export default OrderFooIcon;
