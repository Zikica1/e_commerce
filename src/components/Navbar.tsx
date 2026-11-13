import { Bell, HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import ShoppingCartIcon from './ShoppingCartIcon';

const Navbar = () => {
  return (
    <nav className='border-b border-gray-200 pb-4'>
      <div className='wrapper flex justify-between items-center'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo.png'
            alt='trendLama'
            width={36}
            height={36}
            className='w-6 h-6 md:w-9 md:h-9'
          />
          <p className='uppercase text-black hidden md:block font-medium tracking-wider'>
            trendlama
          </p>
        </Link>
        <div className='flex gap-6 items-center'>
          <SearchBar />
          <HomeIcon className='w-4 h-4 text-gray-600' />
          <Bell className='w-4 h-4 text-gray-600' />
          <ShoppingCartIcon />
          <span>Sing In</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
