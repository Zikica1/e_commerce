import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';
import Product from '@/lib/models/Products';
import { products } from '@/data/db';
import connectDB from '@/lib/connectDB';

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log('Products successfully seeded');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
