import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export type ProductInputType = {
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductType = {
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

export type ProductsType = ProductType[];

export type CategoryType = {
  name: string;
  Icon: LucideIcon;
  slug: string;
};

export type CategoriesType = CategoryType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, 'Name is required!'),
  email: z.email().min(1, 'Email is required!'),
  phone: z
    .string()
    .min(7, 'Phone number must be between 7 and 10 digits!')
    .max(10, 'Phone number must be between 7 and 10 digits!')
    .regex(/^\d+$/, 'Phone number must contain only numbers!'),
  address: z.string().min(1, 'Address is required!'),
  city: z.string().min(1, 'City is required!'),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

// export const paymentFormSchema = z.object({
//   cardHolder: z.string().min(1, 'Card holder is required!'),
//   cardNumber: z
//     .string()
//     .min(16, 'Card Number is required!')
//     .max(16, 'Card Number is required!'),
//   expirationDate: z
//     .string()
//     .regex(
//       /^(0[1-9]|1[0-2])\/\d{2}$/,
//       'Expiration date must be in MM/YY format!',
//     ),
//   cvv: z.string().min(3, 'CVV is required!').max(3, 'CVV is required!'),
// });

// export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};

export type ProductCardDetProp = {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
};

// _________CART______________
export type CartProductType = {
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

export type ItemType = {
  product: CartProductType;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type ItemTypeProp = ItemType[];
// ________________________________

export type FormState = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
    city?: string[];
    form?: string[];
  };
};

export type FormStatePayment = {
  success: boolean;
  errors: {
    cardName?: string[];
    cardNumber?: string[];
    expirationDate?: string[];
    cvv?: string[];
  };
};

//_____________ORDER___________

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

export type ShippingAddress = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

export type Order = {
  orderId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
};

export type OrderFoo = {
  title: string;
  con: string;
  conMob: string;
  Icon: LucideIcon;
};

export type OrderFooTypes = OrderFoo[];

//___________________________
