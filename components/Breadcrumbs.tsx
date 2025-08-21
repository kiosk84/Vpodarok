
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';
import { CATEGORIES } from '../constants';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const params = useParams<{ categoryId?: string }>();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const category = CATEGORIES.find(c => c.id === params.categoryId);

    return (
        <nav className="flex mb-4 text-sm text-hint" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-link hover:underline">
                        <HomeIcon className="w-4 h-4 mr-2" />
                        Главная
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    
                    let breadcrumbName = '';
                    if (value === 'category' && category) {
                        breadcrumbName = category.title;
                    } else if (value === 'order' && category) {
                        breadcrumbName = 'Заказ';
                    } else if (value === 'status') {
                        breadcrumbName = 'Статус';
                    } else if (value === 'about') {
                        breadcrumbName = 'О нас';
                    } else if (value === 'performer-dashboard') {
                        breadcrumbName = 'Кабинет исполнителя';
                    } else {
                        // Don't render cryptic parts of the URL
                        return null;
                    }

                    return (
                        <li key={to}>
                            <div className="flex items-center">
                                <ChevronRightIcon className="w-4 h-4 text-hint" />
                                {isLast ? (
                                    <span className="ml-1 text-foreground font-medium">{breadcrumbName}</span>
                                ) : (
                                    <Link to={to} className="ml-1 text-link hover:underline md:ml-2">
                                        {breadcrumbName}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;