
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useTelegram, ADMIN_USER_ID } from '../hooks/useTelegram';
import type { Service } from '../types';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const { services, updateServiceStatus, isLoading } = useServices();
    const { user } = useTelegram();

    useEffect(() => {
        if (!isLoading && user?.id !== ADMIN_USER_ID) {
            navigate('/');
        }
    }, [user, isLoading, navigate]);

    if (isLoading || user?.id !== ADMIN_USER_ID) {
        return <div className="text-center text-hint p-8">Доступ запрещен.</div>;
    }

    const pendingServices = services.filter(s => s.status === 'pending');
    const approvedServices = services.filter(s => s.status === 'approved');
    const rejectedServices = services.filter(s => s.status === 'rejected');

    const ServiceCard = ({ service }: { service: Service }) => (
        <div className="p-3 bg-card rounded-lg ring-1 ring-zinc-800">
            <div className="flex items-start gap-3">
                <img src={service.imageUrl} alt={service.title} className="w-16 h-16 rounded-md object-cover" />
                <div className="flex-grow">
                    <p className="font-semibold text-foreground leading-tight">{service.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <img src={service.performerAvatarUrl} className="w-4 h-4 rounded-full object-cover" alt={service.performerName} />
                        <span className="text-xs text-hint truncate">{service.performerName}</span>
                    </div>
                </div>
            </div>
            {service.status === 'pending' && (
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-zinc-700">
                    <button onClick={() => updateServiceStatus(service.id, 'approved')} className="text-sm bg-green-500/20 text-green-400 py-2 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 mr-1.5"/> Одобрить
                    </button>
                    <button onClick={() => updateServiceStatus(service.id, 'rejected')} className="text-sm bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center">
                        <XMarkIcon className="w-4 h-4 mr-1.5"/> Отклонить
                    </button>
                     <button onClick={() => navigate(`/service/${service.id}`)} className="text-sm bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center">
                        Предпросмотр
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-background min-h-screen text-foreground font-sans">
             <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center h-16 border-b border-zinc-700">
                <h1 className="text-lg font-bold text-foreground truncate flex-grow text-center">
                    Панель администратора
                </h1>
            </header>
            <main className="p-4 space-y-8 pb-12">
                 <div className="text-center text-sm text-hint p-3 bg-card rounded-lg">
                    Используйте "Предпросмотр", чтобы увидеть услугу глазами клиента перед тем, как одобрить или отклонить ее.
                </div>
                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-3">На модерации ({pendingServices.length})</h2>
                    {pendingServices.length > 0 ? (
                        <div className="space-y-3">
                            {pendingServices.map(s => <ServiceCard key={s.id} service={s} />)}
                        </div>
                    ) : (
                        <p className="text-hint text-sm text-center p-6 bg-card rounded-lg">Нет новых заявок.</p>
                    )}
                </section>
                
                <section>
                    <h2 className="text-xl font-semibold text-foreground mb-3">Одобренные ({approvedServices.length})</h2>
                    {approvedServices.length > 0 ? (
                         <div className="space-y-3">
                            {approvedServices.map(s => <ServiceCard key={s.id} service={s} />)}
                        </div>
                    ) : (
                        <p className="text-hint text-sm text-center p-6 bg-card rounded-lg">Нет одобренных услуг.</p>
                    )}
                </section>

                 <section>
                    <h2 className="text-xl font-semibold text-foreground mb-3">Отклоненные ({rejectedServices.length})</h2>
                    {rejectedServices.length > 0 ? (
                         <div className="space-y-3">
                            {rejectedServices.map(s => <ServiceCard key={s.id} service={s} />)}
                        </div>
                    ) : (
                        <p className="text-hint text-sm text-center p-6 bg-card rounded-lg">Нет отклоненных услуг.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminPage;