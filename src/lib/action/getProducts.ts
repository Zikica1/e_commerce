import connectDB from '../connectDB';
import Product from '../models/Products';

const getProducts = async () => {
  try {
    await connectDB();

    const products = await Product.find().lean();

    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getProducts;
