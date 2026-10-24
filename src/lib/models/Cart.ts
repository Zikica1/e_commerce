import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    cartId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        selectedSize: {
          type: String,
          required: true,
        },
        selectedColor: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
