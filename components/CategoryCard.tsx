import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import type { Category } from '../types';

interface CategoryCardProps {
    category: Category;
    onClick: () => void;
    onQuickRequest: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, onQuickRequest }) => {
    
    const handleQuickRequestClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onQuickRequest(category);
    };

    return (
        <div 
            className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 ring-1 ring-zinc-700 hover:ring-primary transition-all duration-300 cursor-pointer flex flex-col"
            onClick={onClick}
        >
            <div className="relative">
                <img className="w-full h-32 object-cover" src={category.imageUrl} alt={category.title} />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                    {React.createElement(category.icon, { className: "h-5 w-5 text-primary" })}
                </div>
                 <div className="absolute bottom-2 left-3">
                    <h3 className="font-bold text-lg text-white leading-tight">{category.title}</h3>
                </div>
            </div>
            <div className="p-3 flex-grow flex flex-col">
                 <p className="text-sm text-hint mb-3 flex-grow line-clamp-2">{category.description}</p>
                 <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <UserCircleIcon className="w-5 h-5 text-hint flex-shrink-0" />
                      <span className="text-xs text-hint truncate">{category.performer}</span>
                    </div>
                    <button 
                        onClick={handleQuickRequestClick}
                        className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                        aria-label={`Оставить заявку на ${category.title}`}
                    >
                        Заявка
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;