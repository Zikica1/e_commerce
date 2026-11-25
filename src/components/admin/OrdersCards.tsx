import { OrdersType } from '../../../types';

const OrdersCards = ({ orders }: { orders: OrdersType }) => {
  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <h3>Order: {order.orderId}</h3>
            <p>Customer: {order.shippingAddress.name}</p>
            <p>Total: {order.total}</p>
            <p>Status: {order.paymentStatus}</p>
            <p>
              Created ad:{' '}
              {new Date(order.createdAt).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>

            {order.items.map((item) => (
              <div key={item._id}>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersCards;
