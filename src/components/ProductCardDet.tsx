'use client';

import Image from 'next/image';
import { ProductCardDetProp } from '../../types';
import ProductCardDetAction from './ProductCardDetAction';

const ProductCardDet = ({
  product,
  selectedColor,
  selectedSize,
}: ProductCardDetProp) => {
  return (
    <section>
      <div className='flex flex-col lg:flex-row gap-4 mt-8'>
        <div className='relative aspect-2/3 w-full lg:w-5/12'>
          <Image
            src={product.images[selectedColor]}
            alt={product.name}
            fill
            className='object-contain rounded-md'
          />
        </div>
        <div className='flex flex-col gap-2 w-full lg:w-7/12'>
          <h1 className='text-2xl font-medium'>{product.name}</h1>
          <p className='text-gray-500'>{product.description}</p>
          <p className='font-semibold text-lg'>${product.price.toFixed(2)}</p>
          <ProductCardDetAction
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductCardDet;
