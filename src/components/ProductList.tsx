import Categories from './categories/Categories';
import ProductCard from './ProductCard';
import getProducts from '@/lib/action/getProducts';

const ProductList = async ({ category }: { category?: string }) => {
  const products = await getProducts();

  if (!products) return <p>Failed to load products.</p>;

  const productCat =
    category && category !== 'all'
      ? products.filter((p) => p.category === category)
      : products;

  return (
    <section>
      <Categories />
      <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12'>
        {productCat.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
