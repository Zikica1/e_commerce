import LoginForm from '@/components/login/LoginForm';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default page;
