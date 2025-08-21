
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Header from './Header';
import BottomNavBar from './BottomNavBar';
import Breadcrumbs from './Breadcrumbs';

const Layout: React.FC = () => {
    const location = ReactRouterDOM.useLocation();
    
    const isHomePage = location.pathname === '/';
    
    // A simple way to manage titles, can be made more sophisticated
    let title = "VPodarke";
    if (location.pathname.startsWith('/category')) title = "Выбор опций";
    if (location.pathname.startsWith('/order')) title = "Оформление заказа";
    if (location.pathname.startsWith('/status')) title = "Статус заказа";
    if (location.pathname.startsWith('/about')) title = "О нас";
    if (location.pathname.startsWith('/performer-dashboard')) title = "Кабинет исполнителя";


    return (
        <div className="flex flex-col h-screen">
            <Header title={title} showBackButton={!isHomePage} />
            <main className="flex-grow overflow-y-auto p-4 pb-20">
                {!isHomePage && <Breadcrumbs />}
                <ReactRouterDOM.Outlet />
            </main>
            <BottomNavBar />
        </div>
    );
};

export default Layout;
