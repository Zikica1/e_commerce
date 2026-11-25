'use server';

import User from '@/lib/models/User';
import { registerSchema } from '@/lib/validators/registerSchema';
import { z } from 'zod';
import connectDB from '@/lib/connectDB';
import bcrypt from 'bcrypt';

type RegisterFormState = {
  success: boolean;
  errors?: {
    username?: string[];
    email?: string[] | undefined;
    password?: string[];
    form?: string[] | undefined;
  };
};

export const registerUser = async (
  prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> => {
  const payload = {
    username: String(formData.get('username') || ''),
    password: String(formData.get('password') || ''),
    email: String(formData.get('email') || ''),
  };

  const result = registerSchema.safeParse(payload);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      errors: errors.fieldErrors,
    };
  }

  await connectDB();

  const data = result.data;

  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });

  if (existingUser) {
    return {
      success: false,
      errors: {
        email: ['email already exist'],
      },
    };
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  try {
    await User.create({
      username: data.username,
      email: data.email,
      password: hashPassword,
    });
  } catch (err) {
    console.error(err);
    return {
      success: false,
      errors: {
        form: ['Something was wrong'],
      },
    };
  }

  return {
    success: true,
    errors: {},
  };
};
