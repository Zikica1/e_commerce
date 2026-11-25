import { redirect } from 'next/navigation';
import { getUserFromCookies } from './auth';

export const requireRoles = async (
  pathname: string,
  ...allowedRoles: number[]
) => {
  const user = await getUserFromCookies();

  if (!user) {
    redirect(`/login?from=${encodeURIComponent(pathname || '/admin')}`);
  }

  const hasRole = user.UserInfo.roles.some((role) =>
    allowedRoles.includes(role),
  );

  if (!hasRole) {
    redirect('/unauthorized');
  }

  return user;
};
