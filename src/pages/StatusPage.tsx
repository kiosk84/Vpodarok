import React from 'react';
import { ClockIcon, CheckCircleIcon, TruckIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

const mockOrders = [
    { id: '12347', item: 'Авторская песня (Акустика)', status: 'processing', date: '22.07.2024' },
    { id: '12346', item: 'Вкусный букет (Фруктовый)', status: 'shipping', date: '20.07.2024' },
    { id: '12345', item: 'Портрет (Digital Art)', status: 'completed', date: '15.07.2024' },
];

const statusInfo = {
    processing: { text: 'В обработке', icon: ClockIcon, color: 'text-yellow-400' },
    shipping: { text: 'Доставляется', icon: TruckIcon, color: 'text-blue-400' },
    completed: { text: 'Завершен', icon: CheckCircleIcon, color: 'text-green-400' },
};

const StatusPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <header className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Мои заказы</h2>
                <p className="text-hint mt-1">Здесь вы можете отслеживать историю ваших уникальных подарков.</p>
            </header>

            {mockOrders.length === 0 ? (
                <div className="text-center py-12 px-4 bg-card rounded-lg ring-1 ring-zinc-800">
                    <ShoppingBagIcon className="w-12 h-12 text-hint mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground">У вас пока нет заказов</h3>
                    <p className="text-sm text-hint mt-1">Сделайте свой первый заказ, чтобы увидеть его здесь.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {mockOrders.map(order => {
                        const currentStatus = statusInfo[order.status as keyof typeof statusInfo];
                        const Icon = currentStatus.icon;
                        return (
                            <div key={order.id} className="p-4 bg-card rounded-lg ring-1 ring-zinc-800 transition-shadow hover:shadow-lg hover:ring-primary/50">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <p className="font-semibold text-foreground leading-tight">{order.item}</p>
                                        <p className="text-xs text-hint mt-1">Заказ #{order.id} от {order.date}</p>
                                    </div>
                                    <div className={`flex items-center text-sm font-medium ${currentStatus.color} flex-shrink-0 bg-background/50 px-2.5 py-1 rounded-full`}>
                                        <Icon className="w-4 h-4 mr-1.5" />
                                        <span>{currentStatus.text}</span>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StatusPage;