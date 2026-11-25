'use server';

import User from '@/lib/models/User';
import connectDB from '@/lib/connectDB';
import bcrypt from 'bcrypt';
import { loginSchema } from '@/lib/validators/loginSchema';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type LoginFormState = {
  success: boolean;
  errors?: {
    username?: string[];
    email?: string[] | undefined;
    password?: string[];
    form?: string[] | undefined;
  };
};

export const loginUser = async (
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  const payload = {
    email: String(formData.get('email') || ''),
    password: String(formData.get('password') || ''),
  };

  const from = String(formData.get('from') || '/');
  const remember = formData.get('remember') === 'true';

  const result = loginSchema.safeParse(payload);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      errors: errors.fieldErrors,
    };
  }

  await connectDB();

  const data = result.data;

  const foundUser = await User.findOne({ email: data.email });

  if (!foundUser) {
    return {
      success: false,
      errors: {
        email: ['User not found'],
      },
    };
  }

  const matchPwd = await bcrypt.compare(data.password, foundUser.password);

  if (!matchPwd) {
    return {
      success: false,
      errors: {
        password: ['Wrong password'],
      },
    };
  }

  const roles = Object.values(foundUser.roles).filter(Boolean) as number[];

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '1m' },
  );

  const refreshToken = jwt.sign(
    { id: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '1d' },
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  const cookiesStore = await cookies();

  cookiesStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    ...(remember && { maxAge: 24 * 60 * 60 }),
  });

  cookiesStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 1 * 60,
  });

  revalidatePath('/', 'layout');
  redirect(from);
};
