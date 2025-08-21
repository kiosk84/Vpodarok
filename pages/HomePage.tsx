
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useTelegram();

    const handleBecomeCreator = () => {
        navigate('/become-performer');
    };

    const guestName = user?.first_name || 'Гость';

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
                        Здесь вы найдете эксклюзивные услуги от талантливых мастеров: от портретов и авторских песен до уникальных букетов. Каждый заказ — это личная история, созданная специально для вас.
                    </p>
                    <p>
                        А если вы сами создаете нечто особенное, наша площадка — идеальное место, чтобы поделиться своим талантом с миром и найти благодарных клиентов.
                    </p>
                </div>
            </section>
            
            <section>
                <h3 className="text-lg font-semibold text-foreground mb-2">Выберите свой идеальный подарок</h3>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-hint" aria-hidden="true" />
                    </div>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-0 bg-card py-2.5 pl-10 text-foreground ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                        placeholder="Найти портрет, песню, букет..."
                    />
                </div>
            </section>
            
            <section className="pt-4">
                <div className="flex justify-center">
                    <div
                        onClick={handleBecomeCreator}
                        className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 ring-1 ring-zinc-700 hover:ring-primary transition-all duration-300 cursor-pointer flex flex-col w-full max-w-xs"
                    >
                        <div className="relative">
                             <div className="w-full h-32 bg-background flex items-center justify-center">
                                 <PlusCircleIcon className="h-12 w-12 text-hint" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-2 left-3">
                                <h3 className="font-bold text-lg text-white leading-tight">Добавить свою услугу</h3>
                            </div>
                        </div>
                        <div className="p-3 flex-grow flex flex-col text-left">
                            <p className="text-sm text-hint mb-3 flex-grow">
                                Превратите ваше хобби в источник дохода. Поделитесь своим талантом с тысячами пользователей и получайте заказы на то, что вы любите делать.
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-auto">
                                <button
                                    className="bg-primary w-full text-primary-foreground text-sm font-semibold px-3 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                                    aria-label="Стать исполнителем"
                                >
                                    Стать исполнителем
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
