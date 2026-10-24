import connectDB from '../connectDB';
import Product from '../models/Products';

const getProductById = async (id: string) => {
  try {
    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return null;
    }

    return {
      ...product,
      _id: product._id.toString(),
    };
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
};

export default getProductById;
