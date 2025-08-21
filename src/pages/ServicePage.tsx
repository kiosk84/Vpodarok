

import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useOrder } from '../context/OrderContext';
import { useTelegram } from '../hooks/useTelegram';


const ServicePage: React.FC = () => {
    const { serviceId } = ReactRouterDOM.useParams<{ serviceId: string }>();
    const navigate = ReactRouterDOM.useNavigate();
    const { tg } = useTelegram();
    const { services } = useServices();
    const { setOrderDetails } = useOrder();
    
    const service = services.find(s => s.id === serviceId);

    useEffect(() => {
        if (service) {
            document.title = `${service.title} | VPodarke`;
            tg.MainButton.setText('Заказать эту услугу');
            tg.MainButton.show();
            
            const handleOrderClick = () => {
                setOrderDetails(prev => ({
                    ...prev,
                    serviceId: service.id,
                }));
                navigate(`/order/${service.id}`);
            };

            tg.onEvent('mainButtonClicked', handleOrderClick);

            return () => {
                tg.offEvent('mainButtonClicked', handleOrderClick);
                tg.MainButton.hide();
            }
        }
    }, [service, tg, navigate, setOrderDetails]);
    
    if (!service) {
        return <div className="text-center p-8">Услуга не найдена или была удалена.</div>;
    }

    return (
        <div className="space-y-8 pb-4">
            <header className="relative w-full h-40 rounded-lg overflow-hidden ring-1 ring-zinc-800">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <h1 className="text-2xl font-bold text-white">{service.title}</h1>
                </div>
            </header>

            <section className="p-4 bg-card rounded-lg flex items-center gap-4 ring-1 ring-zinc-800">
                <img src={service.performerAvatarUrl} alt={service.performerName} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50" />
                <div>
                    <h2 className="font-bold text-lg text-foreground">{service.performerName}</h2>
                    <p className="text-sm text-hint italic">"{service.performerBio}"</p>
                </div>
            </section>
            
            <section className="p-4 bg-card rounded-lg ring-1 ring-zinc-800 space-y-3 text-sm">
                <h3 className="text-base font-semibold text-foreground -mb-1">Детали услуги</h3>
                <div className="border-t border-zinc-700/50"></div>
                {service.price != null && (
                    <div className="flex justify-between items-center"><strong className="text-hint">Базовая цена:</strong> <span className="font-semibold text-primary text-base">{service.price} ₽</span></div>
                )}
                {service.turnaroundTime && (
                    <div className="flex justify-between items-center"><strong className="text-hint">Срок выполнения:</strong> <span className="font-medium">{service.turnaroundTime}</span></div>
                )}
                {service.category && (
                    <div className="flex justify-between items-center"><strong className="text-hint">Категория:</strong> <span className="font-medium">{service.category}</span></div>
                )}
                {service.tags && service.tags.length > 0 && (
                     <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-700/50">
                         <strong className="text-hint flex-shrink-0">Теги:</strong>
                         {service.tags.map(tag => (
                             <span key={tag} className="text-xs bg-background px-2 py-1 rounded-md ring-1 ring-zinc-700">{tag}</span>
                         ))}
                     </div>
                )}
            </section>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Описание услуги</h2>
                <p className="text-foreground/90 whitespace-pre-wrap">{service.description}</p>
            </div>
            
            <div className="p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                <h3 className="font-semibold text-foreground">Готовы сделать заказ?</h3>
                <p className="text-sm text-hint mt-1">Нажмите кнопку "Заказать" внизу экрана, чтобы перейти к оформлению и обсудить детали с исполнителем.</p>
            </div>
        </div>
    );
};

export default ServicePage;
