
import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import OrderPage from './pages/OrderPage';
import StatusPage from './pages/StatusPage';
import AboutPage from './pages/AboutPage';
import PerformerDashboardPage from './pages/PerformerDashboardPage';
import { useTelegram } from './hooks/useTelegram';
import { OrderProvider } from './context/OrderContext';
import BecomePerformerPage from './pages/BecomePerformerPage';

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
            document.body.style.backgroundColor = '#F4F4F5'; // A common light theme bg
        }
    }, [colorScheme]);

    return (
        <OrderProvider>
            <ReactRouterDOM.HashRouter>
                <div className="bg-background text-foreground min-h-screen font-sans">
                   <ReactRouterDOM.Routes>
                        <ReactRouterDOM.Route path="/become-performer" element={<BecomePerformerPage />} />
                        <ReactRouterDOM.Route path="/" element={<Layout />}>
                            <ReactRouterDOM.Route index element={<HomePage />} />
                            <ReactRouterDOM.Route path="category/:categoryId" element={<CategoryPage />} />
                            <ReactRouterDOM.Route path="order/:categoryId" element={<OrderPage />} />
                            <ReactRouterDOM.Route path="status" element={<StatusPage />} />
                            <ReactRouterDOM.Route path="about" element={<AboutPage />} />
                            <ReactRouterDOM.Route path="performer-dashboard" element={<PerformerDashboardPage />} />
                        </ReactRouterDOM.Route>
                    </ReactRouterDOM.Routes>
                </div>
            </ReactRouterDOM.HashRouter>
        </OrderProvider>
    );
};

export default App;
