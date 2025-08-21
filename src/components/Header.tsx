
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
    title: string;
    showBackButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton }) => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-10 bg-background shadow-sm p-4 flex items-center h-16 border-b border-zinc-700">
            {showBackButton ? (
                <button onClick={() => navigate(-1)} className="text-link mr-2 p-2 rounded-full hover:bg-card/50 transition-colors">
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
            ) : (
                 <div className="w-10"></div> 
            )}
            <h1 className="text-lg font-bold text-foreground truncate flex-grow text-center">
                {title}
            </h1>
            {/* Placeholder for potential right-side actions */}
            <div className="w-10"></div> 
        </header>
    );
};

export default Header;