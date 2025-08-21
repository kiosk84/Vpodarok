
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useServices } from '../context/ServiceContext';

const Breadcrumbs: React.FC = () => {
    const location = ReactRouterDOM.useLocation();
    const params = ReactRouterDOM.useParams<{ serviceId?: string }>();
    const { services } = useServices();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const service = services.find(s => s.id === params.serviceId);

    return (
        <nav className="flex mb-4 text-sm text-hint" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <ReactRouterDOM.Link to="/" className="inline-flex items-center text-link hover:underline">
                        <HomeIcon className="w-4 h-4 mr-2" />
                        Главная
                    </ReactRouterDOM.Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    
                    let breadcrumbName = '';
                    if (value === 'service' && service) {
                        breadcrumbName = service.title;
                    } else if (value === 'order' && service) {
                        breadcrumbName = 'Заказ';
                    } else if (value === 'status') {
                        breadcrumbName = 'Статус';
                    } else if (value === 'about') {
                        breadcrumbName = 'О нас';
                    } else if (value === 'performer-dashboard') {
                        breadcrumbName = 'Кабинет';
                    } else if (value === 'admin') {
                        breadcrumbName = 'Админ-панель';
                    }
                     else {
                        // Don't render cryptic parts of the URL
                        if (value === 'service' || value === 'order') return null;
                    }


                    if (!breadcrumbName) return null;

                    return (
                        <li key={to}>
                            <div className="flex items-center">
                                <ChevronRightIcon className="w-4 h-4 text-hint" />
                                {isLast ? (
                                    <span className="ml-1 text-foreground font-medium">{breadcrumbName}</span>
                                ) : (
                                    <ReactRouterDOM.Link to={to} className="ml-1 text-link hover:underline md:ml-2">
                                        {breadcrumbName}
                                    </ReactRouterDOM.Link>
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
