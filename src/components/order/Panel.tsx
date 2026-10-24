import { ChevronRight } from 'lucide-react';

const Panel = ({
  title,
  isActive,
  onShown,
  children,
}: {
  title: string;
  isActive: boolean;
  onShown: () => void;
  children: React.ReactNode;
}) => {
  return (
    <section className='flex flex-col gap-4'>
      <button
        className='flex items-center justify-between cursor-pointer w-full ring ring-gray-300 rounded-md p-4 font-medium md:hidden'
        onClick={onShown}
      >
        {title} <ChevronRight />
      </button>
      {isActive && <div>{children}</div>}
      <div className='hidden md:block'>{children}</div>
    </section>
  );
};

export default Panel;
