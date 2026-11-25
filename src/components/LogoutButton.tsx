import { logOut } from '@/lib/action/auth/logout';

const LogoutButton = () => {
  return (
    <form
      className='border border-white inline-block py-0.5 px-2 rounded-lg hover:font-medium hover:cursor-pointer transition-all duration-100 '
      action={logOut}
    >
      <button className='cursor-pointer' type='submit'>
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
