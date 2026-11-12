import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
  Truck,
  ClockFading,
  Headset,
} from 'lucide-react';

import { CategoriesType, OrderFooTypes, ProductInputType } from '../../types';

export const products: ProductInputType[] = [
  {
    name: 'Puma Ultra Warm Zip',
    category: 't-shirt',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['s', 'm', 'l', 'xl'],
    colors: ['gray', 'green'],
    images: { gray: '/products/2g.png', green: '/products/2gr.png' },
  },
  {
    name: 'Nike Air Essentials Pullover',
    category: 't-shirt',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 69.9,
    sizes: ['s', 'm', 'l'],
    colors: ['green', 'blue', 'black'],
    images: {
      green: '/products/3gr.png',
      blue: '/products/3b.png',
      black: '/products/3bl.png',
    },
  },
  {
    name: 'Nike Dri Flex T-Shirt',
    category: 't-shirt',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 29.9,
    sizes: ['s', 'm', 'l'],
    colors: ['white', 'pink'],
    images: { white: '/products/4w.png', pink: '/products/4p.png' },
  },
  {
    name: 'Under Armour StormFleece',
    category: 't-shirt',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 49.9,
    sizes: ['s', 'm', 'l'],
    colors: ['red', 'orange', 'black'],
    images: {
      red: '/products/5r.png',
      orange: '/products/5o.png',
      black: '/products/5bl.png',
    },
  },
  {
    name: 'Nike Air Max 270',
    category: 'shoes',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['40', '42', '43', '44'],
    colors: ['gray', 'white'],
    images: { gray: '/products/6g.png', white: '/products/6w.png' },
  },
  {
    name: 'Nike Ultraboost Pulse ',
    category: 'shoes',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 69.9,
    sizes: ['40', '42', '43'],
    colors: ['gray', 'pink'],
    images: { gray: '/products/7g.png', pink: '/products/7p.png' },
  },
  {
    name: 'Levi’s Classic Denim',
    category: 't-shirt',
    shortDescription:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['s', 'm', 'l'],
    colors: ['blue', 'green'],
    images: { blue: '/products/8b.png', green: '/products/8gr.png' },
  },
];

export const categories: CategoriesType = [
  {
    name: 'All',
    Icon: ShoppingBasket,
    slug: 'all',
  },
  {
    name: 'T-shirts',
    Icon: Shirt,
    slug: 't-shirt',
  },
  {
    name: 'Shoes',
    Icon: Footprints,
    slug: 'shoes',
  },
  {
    name: 'Accessories',
    Icon: Glasses,
    slug: 'accessories',
  },
  {
    name: 'Bags',
    Icon: Briefcase,
    slug: 'bags',
  },
  {
    name: 'Dresses',
    Icon: Venus,
    slug: 'dresses',
  },
  {
    name: 'Jackets',
    Icon: Shirt,
    slug: 'jackets',
  },
  {
    name: 'Gloves',
    Icon: Hand,
    slug: 'gloves',
  },
];

export const orderFooter: OrderFooTypes = [
  {
    title: 'Free Shipping',
    con: 'Free shipping on all orders overs $50',
    conMob: 'overs $50',
    Icon: Truck,
  },
  {
    title: 'Fast Delivery',
    con: 'Your delivery wil be deliver 2-5 business days',
    conMob: '2-5 days',
    Icon: ClockFading,
  },
  {
    title: 'Need Help',
    con: 'Contact aur support time 24/7',
    conMob: '24/7',
    Icon: Headset,
  },
];
