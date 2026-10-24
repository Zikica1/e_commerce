import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sizes: [String],
  colors: [String],
  images: {
    type: Object,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
