import CartPageClient from '@/components/cart/CartPageClient';
import { getCart } from '@/lib/action/cartAction';
import { Suspense } from 'react';

const CartPage = async () => {
  const cart = await getCart();

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <CartPageClient cart={cart} />
      </Suspense>
    </main>
  );
};

export default CartPage;
