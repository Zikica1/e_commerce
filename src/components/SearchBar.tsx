import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <form className='hidden sm:flex items-center gap-2 rounded-md py-0.5 px-2 shadow-md ring-1 ring-gray-200'>
      <Search className='w-4 h-4 text-gray-500' />
      <input
        type='text'
        id='search'
        name='search'
        placeholder='Search...'
        className='outline-none text-gray-500 text-sm'
      />
    </form>
  );
};

export default SearchBar;
