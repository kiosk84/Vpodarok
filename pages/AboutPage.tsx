
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    SparklesIcon, 
    UserGroupIcon, 
    ChatBubbleBottomCenterTextIcon,
    QuestionMarkCircleIcon,
    ArrowRightIcon,
    GiftIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    const values = [
        { icon: SparklesIcon, title: 'Уникальность', description: 'Каждый подарок создается вручную с нуля, чтобы стать неповторимым.' },
        { icon: UserGroupIcon, title: 'Талантливые мастера', description: 'Мы работаем только с проверенными художниками, музыкантами и флористами.' },
        { icon: ChatBubbleBottomCenterTextIcon, title: 'Прямое общение', description: 'Вы можете напрямую обсуждать детали заказа с исполнителем.' },
    ];
    
    const howToOrderSteps = [
        { icon: GiftIcon, title: 'Выберите услугу', description: 'Найдите идеальный подарок в нашем каталоге.' },
        { icon: PencilSquareIcon, title: 'Оформите заказ', description: 'Укажите все пожелания и детали.' },
        { icon: CheckCircleIcon, title: 'Получите шедевр', description: 'Мастер выполнит заказ, а мы проконтролируем доставку.' },
    ];

    return (
        <div className="space-y-10 pb-4">
            <header className="text-center p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                <QuestionMarkCircleIcon className="w-12 h-12 text-primary mx-auto mb-3" />
                <h1 className="text-2xl font-bold text-foreground">О нашем маркетплейсе</h1>
                <p className="text-hint mt-2 max-w-2xl mx-auto">
                    VPodarke — это место, где талантливые мастера встречаются с теми, кто ищет особенные, душевные подарки.
                </p>
            </header>
            
            <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 text-center">Как заказать подарок?</h2>
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
            
            <section className="p-4 bg-card rounded-lg ring-1 ring-zinc-800 text-center">
                 <UserPlusIcon className="w-10 h-10 text-primary mx-auto mb-3" />
                 <h2 className="text-xl font-semibold text-foreground">Как стать исполнителем?</h2>
                 <p className="text-hint mt-2 mb-4">
                    Если вы создаете уникальные вещи или оказываете творческие услуги, присоединяйтесь к нашей платформе, чтобы найти новых клиентов.
                 </p>
                 <button
                    onClick={() => navigate('/become-performer')}
                    className="bg-primary text-primary-foreground font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center"
                 >
                    Присоединиться
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                 </button>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 text-center">Наши ценности</h2>
                <div className="grid grid-cols-1 gap-4">
                    {values.map((item, index) => (
                         <div key={index} className="p-4 bg-card rounded-lg ring-1 ring-zinc-800 flex flex-col items-center text-center">
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                                <item.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                            <p className="text-sm text-hint">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;