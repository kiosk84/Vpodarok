
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { HomeIcon, ShoppingBagIcon, UserCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const BottomNavBar: React.FC = () => {
    const navItems = [
        { to: "/", icon: HomeIcon, label: "Главная", end: true },
        { to: "/status", icon: ShoppingBagIcon, label: "Заказы", end: false },
        { to: "/about", icon: InformationCircleIcon, label: "О нас", end: false },
        { to: "/performer-dashboard", icon: UserCircleIcon, label: "Профиль", end: false },
    ];
    
    const baseLinkClass = 'flex flex-col items-center justify-center h-12 w-18 rounded-2xl transition-all duration-300 ease-in-out transform';
    const activeLinkClass = 'bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/20';
    const inactiveLinkClass = 'text-hint hover:bg-white/5 hover:text-foreground';

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-zinc-700 flex justify-around items-center h-16 px-2 shadow-[0_-5px_25px_-5px_rgba(6,182,212,0.15)]">
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                     <ReactRouterDOM.NavLink 
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => 
                            `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                        }
                    >
                        <Icon className="h-6 w-6" />
                        <span className="text-xs mt-0.5">{item.label}</span>
                    </ReactRouterDOM.NavLink>
                )
            })}
        </nav>
    );
};

export default BottomNavBar;
