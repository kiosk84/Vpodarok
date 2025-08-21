
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNavBar from './BottomNavBar';
import Breadcrumbs from './Breadcrumbs';

const Layout: React.FC = () => {
    const location = useLocation();
    
    const isHomePage = location.pathname === '/';
    
    let title = "VPodarke";
    if (location.pathname.startsWith('/service')) title = "Об услуге";
    if (location.pathname.startsWith('/order')) title = "Оформление заказа";
    if (location.pathname.startsWith('/status')) title = "Статус заказа";
    if (location.pathname.startsWith('/about')) title = "О нас";
    if (location.pathname.startsWith('/performer-dashboard')) title = "Кабинет исполнителя";
    if (location.pathname.startsWith('/admin')) title = "Панель администратора";


    return (
        <div className="flex flex-col h-screen">
            <Header title={title} showBackButton={!isHomePage} />
            <main className="flex-grow overflow-y-auto p-4 pb-20">
                {!isHomePage && <Breadcrumbs />}
                <Outlet />
            </main>
            <BottomNavBar />
        </div>
    );
};

export default Layout;