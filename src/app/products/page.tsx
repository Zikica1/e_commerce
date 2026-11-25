import ProductList from '@/components/ProductList';

export const dynamic = 'force-dynamic';

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;

  return (
    <div>
      <ProductList category={category} params='products' />
    </div>
  );
};

export default ProductsPage;
