
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { useOrder } from '../context/OrderContext';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';


const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const { setOrderDetails } = useOrder();
    const category = CATEGORIES.find(c => c.id === categoryId);

    // SEO Optimization Effect
    useEffect(() => {
        if (category) {
            document.title = `${category.title} | VPodarke`;
        }
    }, [category]);
    
    if (!category) {
        return <div className="text-center p-8">Категория не найдена.</div>;
    }

    const handleOptionSelect = (optionId: string) => {
        setOrderDetails(prev => ({
            ...prev,
            categoryId: category.id,
            selectedOptionId: optionId,
        }));
        navigate(`/order/${categoryId}`);
    };

    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, i) => (
            <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-hint/30'}`} />
        ));
    };

    return (
        <div className="space-y-8 pb-4">
            {/* Header Image */}
            <header className="relative w-full h-40 rounded-lg overflow-hidden ring-1 ring-zinc-800">
                <img src={category.imageUrl} alt={category.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <h1 className="text-2xl font-bold text-white">{category.title}</h1>
                </div>
            </header>

            {/* Performer Profile Section */}
            <section className="p-4 bg-card rounded-lg flex items-center gap-4 ring-1 ring-zinc-800">
                <img src={category.performerAvatarUrl} alt={category.performer} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50" />
                <div>
                    <h2 className="font-bold text-lg text-foreground">{category.performer}</h2>
                    <p className="text-sm text-hint italic">"{category.performerBio}"</p>
                </div>
            </section>
            
            {/* Category Description */}
            <p className="text-foreground/90">{category.description}</p>
            
            {/* Options List */}
            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">Выберите вариант</h2>
                {category.options.map(option => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className="w-full flex items-start p-3 bg-card rounded-lg hover:bg-primary/10 ring-1 ring-zinc-800 hover:ring-primary transition-all duration-200 text-left"
                        aria-label={`Выбрать ${option.name}`}
                    >
                        <img src={option.imageUrl} alt={option.name} className="w-20 h-20 rounded-md object-cover mr-4" />
                        <div className="flex-grow">
                            <h3 className="font-semibold text-foreground">{option.name}</h3>
                            <p className="text-sm text-hint mb-1 line-clamp-2">{option.description}</p>
                            <p className="text-sm font-bold text-primary">{option.price}</p>
                        </div>
                        <ChevronRightIcon className="w-6 h-6 text-hint ml-2 flex-shrink-0 self-center" />
                    </button>
                ))}
            </section>

            {/* Reviews Section */}
            <section>
                 <h2 className="text-xl font-semibold text-foreground mb-3">Отзывы клиентов</h2>
                 <div className="space-y-4">
                    {/* Mock Review 1 */}
                    <div className="p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-foreground">Елена В.</span>
                            <div className="flex">{renderStars(5)}</div>
                        </div>
                        <p className="text-sm text-hint italic">"Портрет превзошел все ожидания! Артем — настоящий мастер своего дела. Подарок произвел фурор!"</p>
                    </div>
                    {/* Mock Review 2 */}
                    <div className="p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-foreground">Михаил П.</span>
                            <div className="flex">{renderStars(5)}</div>
                        </div>
                        <p className="text-sm text-hint italic">"Заказывал песню для жены на годовщину. Получилось очень трогательно, до слез. Спасибо Николаю за талант!"</p>
                    </div>
                 </div>
            </section>

            {/* FAQ Section */}
            {category.faq && (
                 <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">Часто задаваемые вопросы</h2>
                    <div className="space-y-2">
                        {category.faq.map((item, index) => (
                            <details key={index} className="bg-card p-3 rounded-lg ring-1 ring-zinc-800 group transition-all duration-300">
                                <summary className="font-semibold text-foreground cursor-pointer flex justify-between items-center list-none">
                                    {item.question}
                                    <ChevronRightIcon className="w-5 h-5 text-hint group-open:rotate-90 transition-transform" />
                                </summary>
                                <p className="text-hint text-sm mt-2 pt-2 border-t border-hint/10">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                 </section>
            )}
        </div>
    );
};

export default CategoryPage;