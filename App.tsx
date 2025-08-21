
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
            <HashRouter>
                <div className="bg-background text-foreground min-h-screen font-sans">
                   <Routes>
                        <Route path="/become-performer" element={<BecomePerformerPage />} />
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="category/:categoryId" element={<CategoryPage />} />
                            <Route path="order/:categoryId" element={<OrderPage />} />
                            <Route path="status" element={<StatusPage />} />
                            <Route path="about" element={<AboutPage />} />
                            <Route path="performer-dashboard" element={<PerformerDashboardPage />} />
                        </Route>
                    </Routes>
                </div>
            </HashRouter>
        </OrderProvider>
    );
};

export default App;