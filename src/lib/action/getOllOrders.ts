'use server';

import Order from '../models/Order';
import connectDB from '../connectDB';
import { requireRoles } from '../server-auth/requireRoles';
import mongoose from 'mongoose';

type OrderItem = {
  _id: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

const getAllOrders = async () => {
  await requireRoles('/admin', 500);

  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 }).lean();

    return orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      items: order.items.map((item: OrderItem) => ({
        ...item,
        _id: item._id.toString(),
        productId: item.productId.toString(),
      })),
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export default getAllOrders;
