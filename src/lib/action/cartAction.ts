'use server';

import { Types } from 'mongoose';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import connectDB from '@/lib/connectDB';
import Cart from '@/lib/models/Cart';
import Product from '../models/Products';

type AddToCartInput = {
  productId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type AddToCartResult = {
  success: boolean;
  message?: string;
};

type CartItem = {
  productId: Types.ObjectId;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type ProductType = {
  _id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

type CartProductType = {
  product: ProductType;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type RemoveCartResponse = {
  success: boolean;
  message: string;
};

const addToCart = async ({
  productId,
  quantity,
  selectedSize,
  selectedColor,
}: AddToCartInput): Promise<AddToCartResult> => {
  try {
    await connectDB();

    const cookieStore = await cookies();
    let cartId = cookieStore.get('cartId')?.value;

    // Ako korisnik još nema cartId
    if (!cartId) {
      cartId = randomUUID();

      cookieStore.set('cartId', cartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    // Pronađi postojeću korpu
    let cart = await Cart.findOne({ cartId });

    // Ako korpa još ne postoji, kreiraj je
    if (!cart) {
      cart = await Cart.create({
        cartId,
        items: [
          {
            productId,
            quantity,
            selectedSize,
            selectedColor,
          },
        ],
      });

      return { success: true };
      //  ovde se kod posle return zavšava
    }

    // Proveri da li isti proizvod sa istim size/color
    // već postoji u korpi
    const existingItem = cart.items.find(
      (item: CartItem) =>
        item.productId.toString() === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        selectedSize,
        selectedColor,
      });
    }

    await cart.save();

    return { success: true };
  } catch (error) {
    console.error('Error adding product to cart:', error);

    return {
      success: false,
      message: 'Failed to add product to cart',
    };
  }
};

export const getCart = async (): Promise<CartProductType[]> => {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;

    if (!cartId) {
      return [];
    }

    const cart = await Cart.findOne({ cartId }).lean();

    if (!cart) {
      return [];
    }

    const productIds = cart.items.map((item: CartItem) =>
      item.productId.toString(),
    );

    const products = await Product.find({
      _id: { $in: productIds },
    }).lean();

    const cartItems = cart.items.map((item: CartItem) => {
      const product = products.find(
        (product) => product._id.toString() === item.productId.toString(),
      );

      return {
        product: {
          ...product,
          _id: product._id.toString(),
        },
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      };
    });

    return cartItems;
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const removeFromCart = async (
  productId: string,
  selectedSize: string,
  selectedColor: string,
): Promise<RemoveCartResponse> => {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;

    if (!cartId) {
      return {
        success: false,
        message: 'Cart not found',
      };
    }

    await Cart.findOneAndUpdate(
      { cartId: cartId }, //pronađi korpu sa cartId-om
      {
        $pull: {
          items: {
            productId, //iz nje ukloni ovaj proizvod
            selectedSize,
            selectedColor,
          },
        },
      },
      { new: true },
    ).lean();

    return {
      success: true,
      message: 'Product removed from cart',
    };
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return {
      success: false,
      message: 'Failed to remove product from cart',
    };
  }
};

export default addToCart;
