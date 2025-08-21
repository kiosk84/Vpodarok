import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useServices } from '../context/ServiceContext';
import ServiceCard from '../components/ServiceCard';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useTelegram();
    const { services, isLoading } = useServices();

    const handleBecomeCreator = () => {
        navigate('/become-performer');
    };

    const guestName = user?.first_name || 'Гость';
    const approvedServices = services.filter(s => s.status === 'approved');

    return (
        <div className="space-y-8">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-2">
                    VPodarke
                </h1>
                <p className="text-lg text-foreground">
                    Маркетплейс подарков и услуг на заказ
                </p>
            </header>
            
            <section className="p-4 bg-card rounded-lg ring-1 ring-zinc-800 text-center">
                <h2 className="text-xl font-bold text-foreground">Здравствуйте, {guestName}!</h2>
                <div className="text-hint mt-2 space-y-2 text-sm max-w-xl mx-auto">
                    <p>
                        Добро пожаловать в VPodarke — платформу, где каждый подарок становится незабываемым событием.
                    </p>
                    <p>
                        Здесь вы найдете эксклюзивные услуги от талантливых мастеров, а если вы сами создаете нечто особенное — наша площадка поможет найти благодарных клиентов.
                    </p>
                </div>
            </section>
            
            <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Доступные услуги</h3>
                {isLoading ? (
                    <p className="text-center text-hint">Загрузка услуг...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {approvedServices.map(service => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onClick={() => navigate(`/service/${service.id}`)}
                            />
                        ))}
                        
                        {/* Add Service Card */}
                        <div
                            onClick={handleBecomeCreator}
                            className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 ring-1 ring-zinc-700 hover:ring-primary transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-4 text-center min-h-[220px]"
                        >
                            <PlusCircleIcon className="h-12 w-12 text-hint mb-3" />
                            <h3 className="font-bold text-lg text-foreground leading-tight">Добавить свою услугу</h3>
                            <p className="text-sm text-hint mt-2">
                                Поделитесь своим талантом с миром и находите новых клиентов.
                            </p>
                        </div>
                    </div>
                )}
                { !isLoading && approvedServices.length === 0 && (
                     <div className="text-center py-10 px-4 mt-4 bg-card rounded-lg ring-1 ring-zinc-800">
                        <h3 className="font-semibold text-foreground">Пока нет активных услуг</h3>
                        <p className="text-sm text-hint mt-1">Будьте первым, кто добавит свою услугу на нашу платформу!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;