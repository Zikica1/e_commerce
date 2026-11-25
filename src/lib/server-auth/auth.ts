import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { refreshToken } from '../action/auth/refreshToken';

export type MyJwtPayload = {
  UserInfo: {
    id: string;
    roles: number[];
  };
};

export const getUserFromCookies = async (): Promise<MyJwtPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // if (!token) return null;
  //u ovom slučaju ne pokreće se ponovo refreshToken

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    const refreshResult = await refreshToken();

    if (!refreshResult.success) return null;

    try {
      const decoded = jwt.verify(refreshResult.accessToken, secret);

      if (typeof decoded === 'string') return null;

      return decoded as MyJwtPayload;
    } catch {
      return null;
    }
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string') return null;

    return decoded as MyJwtPayload;
  } catch {
    const refreshResult = await refreshToken();

    if (!refreshResult.success || !refreshResult.accessToken) {
      return null;
    }

    try {
      const decoded = jwt.verify(refreshResult.accessToken, secret);

      if (typeof decoded === 'string') return null;

      return decoded as MyJwtPayload;
    } catch {
      return null;
    }
  }
};
