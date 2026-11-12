import Categories from './categories/Categories';
import ProductCard from './ProductCard';
import getProducts from '@/lib/action/getProducts';
import Filter from './Filter';
import Link from 'next/link';

const ProductList = async ({
  category,
  params,
}: {
  category?: string;
  params: 'homepage' | 'products';
}) => {
  const products = await getProducts();

  if (!products) return <p>Failed to load products.</p>;

  const productCat =
    category && category !== 'all'
      ? products.filter((p) => p.category === category)
      : products;

  return (
    <section>
      <Categories />
      {params === 'products' && <Filter />}
      <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12'>
        {productCat.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
      <Link
        href={category ? `/products/?category=${category}` : '/products'}
        className='flex justify-end mt-4 underline text-sm text-gray-500'
      >
        View all products
      </Link>
    </section>
  );
};

export default ProductList;
