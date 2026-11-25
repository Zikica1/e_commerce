import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 300,
    },
    Editor: Number,
    Admin: Number,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
