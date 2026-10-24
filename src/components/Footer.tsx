import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const data = new Date();

  return (
    <footer className='flex flex-col items-center gap-4 text-center bg-gray-800 text-white/50 rounded-lg p-8 mt-16 text-sm md:flex-row md:justify-between md:items-start md:text-left'>
      <ul className='flex flex-col gap-4'>
        <li>
          <Link
            href='/'
            className='flex justify-center items-center md:justify-start'
          >
            <Image src='/logo.png' alt='Trendlama' width={36} height={36} />
            <p className='hidden'>trendlama</p>
          </Link>
        </li>
        <li>copyright &copy; {data.getFullYear()}</li>
        <li>All right reserved.</li>
      </ul>
      <ul className='flex flex-col gap-4'>
        <li className='text-amber-50'>Links</li>
        <li>Homepage</li>
        <li>Contact</li>
        <li>Terms of Service</li>
        <li>Privacy policy</li>
      </ul>
      <ul className='flex flex-col gap-4'>
        <li className='text-amber-50'>Links</li>
        <li>All Products</li>
        <li>New Arrivals</li>
        <li>Best Sellers</li>
        <li>Sale</li>
      </ul>
      <ul className='flex flex-col gap-4'>
        <li className='text-amber-50'>Links</li>
        <li>About</li>
        <li>Contact</li>
        <li>Blog</li>
        <li>Affiliate Program</li>
      </ul>
    </footer>
  );
};

export default Footer;
