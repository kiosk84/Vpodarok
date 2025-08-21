
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, ShoppingCartIcon, BanknotesIcon, StarIcon, Cog6ToothIcon, CheckBadgeIcon, PencilIcon } from '@heroicons/react/24/solid';

const PerformerDashboardPage: React.FC = () => {
    const navigate = useNavigate();

    // Mock data for demonstration
    const performer = {
        name: 'Артем Пономарев',
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100',
        status: 'Проверенный исполнитель',
        badges: ['Популярный исполнитель']
    };

    const stats = [
        { name: 'Просмотры профиля', value: '1.2k', icon: EyeIcon, color: 'text-blue-400' },
        { name: 'Всего заказов', value: '48', icon: ShoppingCartIcon, color: 'text-green-400' },
        { name: 'Доход за месяц', value: '120,500₽', icon: BanknotesIcon, color: 'text-purple-400' },
    ];

    const service = {
        title: 'Портреты на холсте',
        imageUrl: 'https://images.unsplash.com/photo-1579783A02614-a3fb3927b6a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
        status: 'Активна',
    };

    return (
        <div className="space-y-6 pb-4">
            {/* Performer Profile Card */}
            <section className="p-4 bg-card rounded-lg flex flex-col items-center text-center ring-1 ring-zinc-800 shadow-lg">
                <div className="relative">
                    <img src={performer.avatarUrl} alt={performer.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/50" />
                    <CheckBadgeIcon className="absolute bottom-0 right-0 w-7 h-7 text-blue-400 bg-card rounded-full p-0.5" title={performer.status} />
                </div>
                <h1 className="mt-3 text-2xl font-bold text-foreground">{performer.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    {performer.badges.map(badge => (
                        <span key={badge} className="flex items-center text-xs font-semibold bg-yellow-400/10 text-yellow-300 px-2.5 py-1 rounded-full">
                            <StarIcon className="w-3.5 h-3.5 mr-1.5" />
                            {badge}
                        </span>
                    ))}
                </div>
                <button className="mt-4 flex items-center justify-center text-sm bg-background w-full py-2 rounded-lg ring-1 ring-zinc-700 hover:ring-primary transition-colors">
                    <Cog6ToothIcon className="w-4 h-4 mr-2" />
                    Настройки профиля
                </button>
            </section>

            {/* Analytics Section */}
            <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">Ваша статистика</h2>
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
            
            {/* My Services Section */}
            <section>
                 <h2 className="text-xl font-semibold text-foreground mb-3">Мои услуги</h2>
                 <div className="p-3 bg-card rounded-lg ring-1 ring-zinc-800">
                     <div className="flex items-start gap-4">
                         <img src={service.imageUrl} alt={service.title} className="w-24 h-24 rounded-md object-cover" />
                         <div className="flex-grow">
                             <h3 className="font-semibold text-foreground leading-tight">{service.title}</h3>
                             <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${service.status === 'Активна' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-hint'}`}>
                                 {service.status}
                             </span>
                             <p className="text-xs text-hint mt-2">Базовая цена: от 2500₽</p>
                         </div>
                     </div>
                     <div className="flex gap-2 mt-3 pt-3 border-t border-zinc-700">
                         <button className="flex-1 text-sm bg-background py-2 rounded-lg ring-1 ring-zinc-700 hover:ring-primary transition-colors flex items-center justify-center">
                            <PencilIcon className="w-4 h-4 mr-2"/> Редактировать
                         </button>
                         <button className="flex-1 text-sm bg-background py-2 rounded-lg ring-1 ring-zinc-700 hover:ring-primary transition-colors flex items-center justify-center">
                             <EyeIcon className="w-4 h-4 mr-2"/> Предпросмотр
                         </button>
                     </div>
                 </div>
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