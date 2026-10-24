import Cart from '../models/Cart';

const clearCart = async (cartId: string) => {
  const cart = await Cart.findOneAndUpdate(
    { cartId },
    {
      $set: {
        items: [],
      },
    },
    { new: true },
  ).lean();

  if (!cart) {
    throw new Error('Cart not found');
  }

  return cart;
};

export default clearCart;
