'use client';

import { Minus, Plus } from 'lucide-react';
import { ProductCardDetProp } from '../../types';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import addToCart from '@/lib/action/cartAction';

const ProductCardDetAction = ({
  product,
  selectedColor,
  selectedSize,
}: ProductCardDetProp) => {
  const [quantity, setQuantity] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleTypeChange = (type: 'color' | 'size', value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantity = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart({
      productId: product._id,
      quantity,
      selectedSize,
      selectedColor,
    });

    if (result.success) {
      toast.success('Product added to cart');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className='flex flex-col gap-4'>
      {/* SIZES */}
      <div className='flex flex-col gap-2 text-xs'>
        <span className='text-gray-500'>Size</span>
        <ul className='flex items-center gap-2'>
          {product.sizes.map((size) => (
            <li
              key={size}
              onClick={() => handleTypeChange('size', size)}
              className={`border p-0.5 cursor-pointer ${size === selectedSize ? 'border-gray-600 bg-black text-white' : 'border-gray-300 bg-white text-black'} w-6 h-6 p-2 grid place-content-center`}
            >
              {size.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
      {/* COLOR */}
      <div className='flex flex-col gap-2'>
        <span className='text-gray-500 text-xs'>Color</span>
        <ul className='flex items-center gap-2'>
          {product.colors.map((color) => (
            <li
              onClick={() => handleTypeChange('color', color)}
              key={color}
              className='w-6 h-6 cursor-pointer'
              style={{ backgroundColor: color }}
            ></li>
          ))}
        </ul>
      </div>
      {/* QUANTITY */}
      <div className='flex flex-col gap-2 text-sm'>
        <span className='text-gray-500 '>Quantity</span>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => handleQuantity('decrement')}
            className='border border-gray-400 cursor-pointer  p-1'
          >
            <Minus className='w-4 h-4' />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleQuantity('increment')}
            className='border border-gray-400 cursor-pointer p-1'
          >
            <Plus className='w-4 h-4' />
          </button>
        </div>
      </div>
      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        className='flex justify-center items-center gap-4 border border-gray-400 rounded-md shadow-lg py-2 px-4 bg-gray-800 text-white text-lg font-medium cursor-pointer'
      >
        <Plus />
        Add to cart
      </button>
    </section>
  );
};

export default ProductCardDetAction;
