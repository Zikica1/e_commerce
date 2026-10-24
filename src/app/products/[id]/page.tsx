import ProductCardDet from '@/components/ProductCardDet';
import getProductById from '@/lib/action/getProductById';

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string; size?: string }>;
}) => {
  const { id } = await params;
  const { color, size } = await searchParams;

  const product = await getProductById(id);

  if (!product) return <p>Product not found</p>;

  const selectedColor = color || (product.colors[0] as string);
  const selectedSize = size || (product.sizes[0] as string);

  return (
    <div>
      <ProductCardDet
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  );
};

export default page;
