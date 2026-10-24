'use client';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { ProductType } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon } from 'lucide-react';

import addToCart from '@/lib/action/cartAction';

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    color: product.colors[0],
    size: product.sizes[0],
  });

  const router = useRouter();

  const handleProductType = ({
    type,
    value,
  }: {
    type: 'color' | 'size';
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    const result = await addToCart({
      productId: product._id,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });

    if (result.success) {
      toast.success('Product added to cart');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <li className='shadow-lg overflow-hidden rounded-lg'>
      <Link href={`/products/${product._id}`}>
        <div className='relative aspect-2/3 overflow-hidden'>
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            loading='eager'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw'
            className='object-cover hover:scale-105 transition-all duration-300'
          />
        </div>
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <h3 className='text-2xl font-medium'>{product.name}</h3>
        <p className='text-gray-500'>{product.shortDescription}</p>
        <div className='flex items-center gap-4'>
          {/* SIZES */}
          <div className='flex flex-col gap-1'>
            <span className='text-base text-gray-500 rounded-lg'>Size</span>
            <select
              name='size'
              id='size'
              onChange={(e) =>
                handleProductType({ type: 'size', value: e.target.value })
              }
              className='text-sm ring ring-gray-300 rounded-md px-2 py-0.5'
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLORS */}
          <div className='flex flex-col gap-1'>
            <span className='text-gray-500'>Colors</span>
            <div className='flex items-center gap-4'>
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() =>
                    handleProductType({ type: 'color', value: color })
                  }
                  className={`h-3.5 w-3.5 rounded-full ring-offset-2 ${productTypes.color === color ? 'ring-gray-400' : 'ring-gray-200'} ring-1 cursor-pointer`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE&CART BUTTON */}
        <div className='flex items-center justify-between'>
          <p className='font-medium'>${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className='flex items-center gap-1 ring ring-gray-200 rounded-md shadow-md px-2 py-1 cursor-pointer text-sm hover:text-white hover:bg-black transition-all duration-300'
          >
            <ShoppingCartIcon className='h-4 w-4' />
            Add to Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
