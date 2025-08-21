
import React, { useEffect, Suspense, lazy } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import OrderPage from './pages/OrderPage';
import StatusPage from './pages/StatusPage';
import AboutPage from './pages/AboutPage';
import PerformerDashboardPage from './pages/PerformerDashboardPage';
import { useTelegram } from './hooks/useTelegram';
import { OrderProvider } from './context/OrderContext';
import { ServiceProvider } from './context/ServiceContext';
import BecomePerformerPage from './pages/BecomePerformerPage';
import AdminPage from './pages/AdminPage';
import LoadingPage from './pages/LoadingPage';

// Lazy load the main layout component
const Layout = lazy(() => import('./components/Layout'));

const App: React.FC = () => {
    const { tg, colorScheme } = useTelegram();

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, [tg]);

    useEffect(() => {
        const root = document.documentElement;
        if (colorScheme === 'dark') {
            root.classList.add('dark');
            document.body.style.backgroundColor = '#18181B';
        } else {
            root.classList.remove('dark');
            document.body.style.backgroundColor = '#F4F4F5';
        }
    }, [colorScheme]);

    return (
        <ServiceProvider>
            <OrderProvider>
                <ReactRouterDOM.HashRouter>
                    <div className="bg-background text-foreground min-h-screen font-sans">
                       <Suspense fallback={<LoadingPage />}>
                           <ReactRouterDOM.Routes>
                                <ReactRouterDOM.Route path="/become-performer" element={<BecomePerformerPage />} />
                                <ReactRouterDOM.Route path="/admin" element={<AdminPage />} />
                                <ReactRouterDOM.Route path="/" element={<Layout />}>
                                    <ReactRouterDOM.Route index element={<HomePage />} />
                                    <ReactRouterDOM.Route path="service/:serviceId" element={<ServicePage />} />
                                    <ReactRouterDOM.Route path="order/:serviceId" element={<OrderPage />} />
                                    <ReactRouterDOM.Route path="status" element={<StatusPage />} />
                                    <ReactRouterDOM.Route path="about" element={<AboutPage />} />
                                    <ReactRouterDOM.Route path="performer-dashboard" element={<PerformerDashboardPage />} />
                                </ReactRouterDOM.Route>
                            </ReactRouterDOM.Routes>
                       </Suspense>
                    </div>
                </ReactRouterDOM.HashRouter>
            </OrderProvider>
        </ServiceProvider>
    );
};

export default App;
