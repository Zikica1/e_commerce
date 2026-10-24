'use client';
import styles from './Categories.module.css';
import { categories } from '@/data/db';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import CategoryIcon from '../CategoryIcon';

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get('category');

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', value || 'all');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ul
      className={`${styles.gridFluid} gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm`}
    >
      {categories.map((category) => (
        <li
          key={category.name}
          onClick={() => handleChange(category.slug)}
          className={`${category.slug === selectedCategory ? 'bg-white' : 'text-gray-500'} flex gap-1 items-center  mb-2 cursor-pointer rounded-md px-2 py-1`}
        >
          <CategoryIcon category={category} />
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
