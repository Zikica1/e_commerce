'use server';

import Order from '../models/Order';
import connectDB from '../connectDB';
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

const getOrder = async (orderId: string) => {
  try {
    await connectDB();

    const order = await Order.findOne({ orderId }).lean();

    if (!order) {
      return null;
    }

    return {
      ...order,
      _id: order._id.toString(),
      items: order.items.map((item: OrderItem) => ({
        ...item,
        _id: item._id.toString(),
        productId: item.productId.toString(),
      })),
    };
  } catch (error) {
    console.error('Error getting order:', error);
    return null;
  }
};

export default getOrder;
