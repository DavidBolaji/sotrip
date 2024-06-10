// components/CategoryButton.tsx
import React from 'react';

interface CategoryButtonProps {
  active: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ active, icon: Icon, label }) => {
  return (
    <button className={`flex items-center px-4 py-2 rounded-lg hover:text-white hover:bg-blue-600 transition-colors duration-200 ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
      {Icon && <Icon className="mr-2" />}
      <span className='whitespace-nowrap'>{label}</span>
    </button>
  );
};

export default CategoryButton;
