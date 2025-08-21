
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useOrder } from '../context/OrderContext';
import { useTelegram } from '../hooks/useTelegram';


const ServicePage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
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