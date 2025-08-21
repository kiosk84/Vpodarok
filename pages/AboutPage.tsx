
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    QuestionMarkCircleIcon,
    ArrowRightIcon,
    GiftIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    UserPlusIcon,
    MagnifyingGlassIcon,
    ChatBubbleLeftRightIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    
    const howToOrderSteps = [
        { icon: MagnifyingGlassIcon, title: '1. Найдите услугу', description: 'Просматривайте каталог на главной странице, чтобы найти то, что вам по душе.' },
        { icon: GiftIcon, title: '2. Изучите детали', description: 'Нажмите на услугу, чтобы узнать больше об исполнителе и посмотреть примеры работ.' },
        { icon: PencilSquareIcon, title: '3. Оформите заказ', description: 'Нажмите кнопку "Заказать", укажите все пожелания и детали в простой форме.' },
        { icon: ChatBubbleLeftRightIcon, title: '4. Обсудите и получите', description: 'Исполнитель свяжется с вами для подтверждения. Вы получите уникальный подарок, созданный специально для вас.' },
    ];

    const howToBecomePerformerSteps = [
        { icon: UserPlusIcon, title: '1. Зарегистрируйтесь', description: 'Нажмите "Добавить свою услугу" на главной странице и заполните простую анкету о себе и своем таланте.' },
        { icon: CheckCircleIcon, title: '2. Пройдите модерацию', description: 'Ваша заявка будет рассмотрена администратором. Вы сможете отслеживать статус в личном кабинете.' },
        { icon: RocketLaunchIcon, title: '3. Получайте заказы', description: 'После одобрения ваша услуга появится в общем каталоге, и вы начнете получать заказы от новых клиентов.' },
    ];


    return (
        <div className="space-y-10 pb-4">
            <header className="text-center p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                <QuestionMarkCircleIcon className="w-12 h-12 text-primary mx-auto mb-3" />
                <h1 className="text-2xl font-bold text-foreground">Как это работает?</h1>
                <p className="text-hint mt-2 max-w-2xl mx-auto">
                    VPodarke — это платформа, где творческие люди находят своих клиентов, а клиенты — уникальные подарки с душой.
                </p>
            </header>
            
            <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 text-center">Для Заказчиков: Как найти идеальный подарок?</h2>
                <div className="space-y-3">
                    {howToOrderSteps.map((step, index) => (
                        <div key={index} className="flex items-start p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                            <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mr-4">
                               <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{step.title}</h3>
                                <p className="text-sm text-hint">{step.description}</p>
                            </div>
                        </div>
                     ))}
                </div>
            </section>
            
             <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 text-center">Для Исполнителей: Как поделиться своим талантом?</h2>
                <div className="space-y-3">
                    {howToBecomePerformerSteps.map((step, index) => (
                        <div key={index} className="flex items-start p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                            <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mr-4">
                               <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{step.title}</h3>
                                <p className="text-sm text-hint">{step.description}</p>
                            </div>
                        </div>
                     ))}
                </div>
                 <button
                    onClick={() => navigate('/become-performer')}
                    className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 px-5 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center"
                 >
                    Начать
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                 </button>
            </section>
        </div>
    );
};

export default AboutPage;
