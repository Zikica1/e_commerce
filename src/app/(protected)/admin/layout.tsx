import { requireRoles } from '@/lib/server-auth/requireRoles';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRoles('/admin', 500);

  return children;
}
