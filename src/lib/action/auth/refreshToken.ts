'use server';

import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import connectDB from '@/lib/connectDB';
import User from '@/lib/models/User';

type RefreshTokenPayload = JwtPayload & {
  id: string;
};

type RefreshResponse =
  | { success: true; accessToken: string }
  | { success: false; errors: { form: string[] } };

export const refreshToken = async (): Promise<RefreshResponse> => {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const refreshTokenValue = cookieStore.get('refreshToken')?.value;

    if (!refreshTokenValue) {
      return {
        success: false,
        errors: {
          form: ['401-Client not authentication'],
        },
      };
    }

    let payload: RefreshTokenPayload;

    try {
      payload = jwt.verify(
        refreshTokenValue,
        process.env.REFRESH_TOKEN_SECRET!,
      ) as RefreshTokenPayload;
    } catch {
      return {
        success: false,
        errors: {
          form: ['403-Client does not have permission'],
        },
      };
    }

    const user = await User.findById(payload.id);

    if (!user) {
      return {
        success: false,
        errors: {
          form: ['403-Client does not have permission'],
        },
      };
    }

    if (user.refreshToken !== refreshTokenValue) {
      return {
        success: false,
        errors: {
          form: ['403-Token mismatch'],
        },
      };
    }

    const roles = Object.values(user.roles).filter(Boolean) as number[];

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' },
    );

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 15 * 60,
      path: '/',
    });

    return {
      success: true,
      accessToken,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      errors: {
        form: ['500-server error'],
      },
    };
  }
};
