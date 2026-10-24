'use server';

import Cart from '../models/Cart';
import Order from '../models/Order';
import Product from '../models/Products';
import crypto from 'crypto';
import { Types } from 'mongoose';

type OrderItem = {
  productId: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

type CartItem = {
  productId: Types.ObjectId;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

const createOrder = async (cartId: string) => {
  const cart = await Cart.findOne({ cartId }).lean();

  if (!cart) {
    throw new Error('Cart not found');
  }

  const productIds = cart.items.map((item: CartItem) => item.productId);

  const products = await Product.find({
    _id: { $in: productIds },
  }).lean();

  const orderItems: OrderItem[] = cart.items.map((item: CartItem) => {
    const product = products.find(
      (product) => product._id.toString() === item.productId.toString(),
    );

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      productId: product._id,
      name: product.name,
      image: product.images[item.selectedColor],
      price: product.price,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      quantity: item.quantity,
    };
  });

  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const order = await Order.create({
    orderId: crypto.randomUUID(),
    items: orderItems,
    shippingAddress: cart.shippingAddress,
    total,
    paymentStatus: 'paid',
  });

  return order;
};

export default createOrder;
