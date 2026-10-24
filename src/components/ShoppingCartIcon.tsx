import { getCart } from '@/lib/action/cartAction';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const ShoppingCartIcon = async () => {
  const cart = await getCart();

  const itemCount = cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <Link href='/cart' className='flex items-center relative'>
      <ShoppingCart className='h-4 w-4 text-gray-600' />
      <span className='absolute -top-3 -right-3 grid place-content-center text-xs font-medium w-4 h-4 rounded-full text-gray-600 bg-amber-400'>
        {itemCount}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
