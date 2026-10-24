import ProductList from '@/components/ProductList';
import Image from 'next/image';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;
  return (
    <main>
      <div className='relative aspect-3/1 mb-12'>
        <Image src='/featured.png' alt='Featured product' fill />
      </div>
      <ProductList category={category} />
    </main>
  );
};

export default page;
