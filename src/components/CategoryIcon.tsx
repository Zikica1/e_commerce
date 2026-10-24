import { CategoryType } from '../../types';

const CategoryIcon = ({ category }: { category: CategoryType }) => {
  const Icon = category.Icon;
  return <Icon className='w-4 h-4' />;
};
export default CategoryIcon;
