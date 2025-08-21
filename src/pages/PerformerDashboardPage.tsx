
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { CheckCircleIcon, ClockIcon, XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { useTelegram } from '../hooks/useTelegram';
import { useServices } from '../context/ServiceContext';

const statusInfo = {
    pending: { text: 'На рассмотрении', icon: ClockIcon, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
    approved: { text: 'Одобрено', icon: CheckCircleIcon, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    rejected: { text: 'Отклонено', icon: XCircleIcon, color: 'text-red-400', bgColor: 'bg-red-500/10' },
};

const PerformerDashboardPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const { user } = useTelegram();
    const { services, isLoading } = useServices();

    if (isLoading || !user) {
        return <div className="text-center text-hint">Загрузка данных...</div>;
    }
    
    const myServices = services.filter(s => s.performerId === user.id);

    const stats = [
        { name: 'Активные', value: myServices.filter(s => s.status === 'approved').length, icon: CheckCircleIcon, color: 'text-green-400' },
        { name: 'В ожидании', value: myServices.filter(s => s.status === 'pending').length, icon: ClockIcon, color: 'text-yellow-400' },
        { name: 'Отклоненные', value: myServices.filter(s => s.status === 'rejected').length, icon: XCircleIcon, color: 'text-red-400' },
    ];
    
    return (
        <div className="space-y-6 pb-4">
            <section className="p-4 bg-card rounded-lg flex items-center gap-4 ring-1 ring-zinc-800 shadow-lg">
                <img src={myServices[0]?.performerAvatarUrl || `https://ui-avatars.com/api/?name=${user.first_name}&background=06b6d4&color=fff`} alt={user.first_name} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50" />
                <div>
                     <h1 className="text-2xl font-bold text-foreground">{myServices[0]?.performerName || user.first_name}</h1>
                     <p className="text-sm text-hint">Кабинет исполнителя</p>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">Сводка</h2>
                <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.name} className="p-3 bg-card rounded-lg ring-1 ring-zinc-800 flex flex-col items-center text-center">
                                <Icon className={`w-7 h-7 mb-2 ${stat.color}`} />
                                <span className="text-xl font-bold text-foreground">{stat.value}</span>
                                <span className="text-xs text-hint leading-tight">{stat.name}</span>
                            </div>
                        );
                    })}
                </div>
            </section>
            
            <section>
                 <h2 className="text-xl font-semibold text-foreground mb-3">Мои услуги</h2>
                 {myServices.length > 0 ? (
                    <div className="space-y-3">
                    {myServices.map((service) => {
                         const currentStatus = statusInfo[service.status];
                         const Icon = currentStatus.icon;
                        return (
                             <div key={service.id} className="p-3 bg-card rounded-lg ring-1 ring-zinc-800">
                                 <div className="flex items-start gap-4">
                                     <img src={service.imageUrl} alt={service.title} className="w-20 h-20 rounded-md object-cover" />
                                     <div className="flex-grow">
                                         <h3 className="font-semibold text-foreground leading-tight">{service.title}</h3>
                                         <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 inline-flex items-center ${currentStatus.bgColor} ${currentStatus.color}`}>
                                             <Icon className="w-3.5 h-3.5 mr-1"/> {currentStatus.text}
                                         </span>
                                     </div>
                                 </div>
                             </div>
                        );
                    })}
                    </div>
                 ) : (
                    <div className="text-center py-10 px-4 bg-card rounded-lg ring-1 ring-zinc-800">
                        <PlusCircleIcon className="w-12 h-12 text-hint mx-auto mb-3" />
                        <h3 className="font-semibold text-foreground">У вас пока нет услуг</h3>
                        <p className="text-sm text-hint mt-1">Добавьте свою первую услугу, чтобы начать получать заказы.</p>
                    </div>
                 )}
                 <button 
                    onClick={() => navigate('/become-performer')}
                    className="mt-3 w-full text-center py-2.5 text-sm font-semibold bg-primary/20 text-primary rounded-lg ring-1 ring-primary/50 hover:bg-primary/30 transition-colors"
                 >
                     + Добавить новую услугу
                 </button>
            </section>
        </div>
    );
};

export default PerformerDashboardPage;
