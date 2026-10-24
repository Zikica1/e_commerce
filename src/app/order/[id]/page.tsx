import OrderPageClient from '@/components/order/OrderPageClient';
import getOrder from '@/lib/action/getOrder';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) {
    return <p>Order not found.</p>;
  }

  return <OrderPageClient order={order} />;
};

export default page;
