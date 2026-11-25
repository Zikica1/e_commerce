'use server';

import { cookies } from 'next/headers';
import connectDB from '@/lib/connectDB';
import User from '@/lib/models/User';
import { redirect } from 'next/navigation';

export const logOut = async (_formData: FormData): Promise<void> => {
  await connectDB();

  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get('refreshToken')?.value;

  // obriši refresh token iz baze (ako postoji)
  if (refreshToken) {
    const user = await User.findOne({ refreshToken });

    if (user) {
      user.refreshToken = '';
      await user.save();
    }
  }

  // NAJBITNIJE — briši cookies
  cookiesStore.delete('refreshToken');
  cookiesStore.delete('accessToken');

  redirect('/');
};
