
import React from 'react';
import { Category } from '../types';

interface CategoryPillProps {
    category: Category;
    isActive?: boolean;
    onClick?: () => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ category, isActive, onClick }) => {
    const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200';
    const activeClasses = 'bg-accent text-white';
    const inactiveClasses = 'bg-slate-700 text-text-secondary hover:bg-slate-600';
    const clickableClasses = onClick ? 'cursor-pointer' : '';

    return (
        <span
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${clickableClasses}`}
            onClick={onClick}
        >
            {category.name}
        </span>
    );
};

export default CategoryPill;
