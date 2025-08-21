
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowUpTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CATEGORIES } from '../constants';
import { useOrder } from '../context/OrderContext';
import { useTelegram } from '../hooks/useTelegram';

const OrderPage: React.FC = () => {
    const { categoryId } = ReactRouterDOM.useParams<{ categoryId: string }>();
    const navigate = ReactRouterDOM.useNavigate();
    const { tg } = useTelegram();
    const { orderDetails, setOrderDetails, resetOrder } = useOrder();
    const [currentStep, setCurrentStep] = useState(0);

    const category = CATEGORIES.find(c => c.id === categoryId);
    
    useEffect(() => {
        // This effect runs when the component mounts.
        // It sets the categoryId in the context if it's not already there.
        if (categoryId && !orderDetails.categoryId) {
            setOrderDetails(prev => ({...prev, categoryId: categoryId}));
        }

        // If no option is selected, we should redirect the user
        // to the category page to make a selection first.
        if (!orderDetails.selectedOptionId && categoryId) {
            navigate(`/category/${categoryId}`);
        }
    }, [orderDetails.selectedOptionId, categoryId, navigate, setOrderDetails, orderDetails.categoryId]);

    if (!category) {
        return <div className="text-center">Категория не найдена.</div>;
    }

    const steps = category.orderSteps;
    const activeStep = steps[currentStep];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final step logic
            tg.showConfirm("Вы уверены, что хотите оформить заказ?", (ok: boolean) => {
                if(ok) {
                    tg.MainButton.setText('Оформляем...');
                    tg.MainButton.showProgress();
                    // Simulate API call
                    setTimeout(() => {
                        tg.MainButton.hideProgress();
                        tg.MainButton.setText('Готово!');
                        tg.showAlert('Ваш заказ успешно оформлен! Мы скоро свяжемся с вами.');
                        resetOrder(); // Clear the order context
                        navigate('/status'); // Navigate to status page
                    }, 2000);
                }
            });
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setOrderDetails(prev => ({...prev, uploadedFile: e.target.files![0]}));
        }
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        setOrderDetails(prev => ({
            ...prev,
            textDetails: prev.textDetails ? `${prev.textDetails}\n${suggestion}` : suggestion
        }));
    };

    const renderStepContent = () => {
        switch(activeStep.component) {
            case 'upload':
                return (
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-600 rounded-lg text-center">
                         <ArrowUpTrayIcon className="w-12 h-12 text-hint mb-4"/>
                         <label htmlFor="file-upload" className="cursor-pointer bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                             Выбрать файл
                         </label>
                         <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                         {orderDetails.uploadedFile ? (
                            <p className="mt-4 text-sm text-foreground">Выбрано: <span className="font-semibold">{orderDetails.uploadedFile.name}</span></p>
                         ) : (
                            <p className="mt-2 text-xs text-hint">Макс. размер файла: 10МБ</p>
                         )}
                    </div>
                );
            case 'details':
                const suggestions = ["Подарок на день рождения.", "Сделать сюрприз для любимого человека.", "Корпоративный подарок для коллеги.", "Хочу что-то в ярких/пастельных тонах."];
                 return (
                    <div>
                        <textarea 
                            className="w-full p-3 border border-zinc-700 rounded-md bg-card text-foreground focus:ring-2 focus:ring-link focus:outline-none transition-shadow"
                            rows={6}
                            placeholder="Опишите ваши пожелания, историю, которую должна рассказать песня, или предпочтения по составу букета..."
                            value={orderDetails.textDetails}
                            onChange={(e) => setOrderDetails(prev => ({...prev, textDetails: e.target.value}))}
                            aria-label="Поле для ввода деталей заказа"
                        />
                        <div className="mt-4">
                           <p className="text-sm text-hint mb-2">Быстрые подсказки:</p>
                           <div className="flex flex-wrap gap-2">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestionClick(s)}
                                        className="flex items-center text-xs bg-card border border-zinc-700 text-hint hover:border-primary hover:text-primary px-3 py-1.5 rounded-full transition-colors"
                                    >
                                       <PlusIcon className="w-3 h-3 mr-1.5"/>
                                       {s}
                                    </button>
                                ))}
                           </div>
                        </div>
                    </div>
                 );
            case 'confirm':
                const selectedOption = category.options.find(o => o.id === orderDetails.selectedOptionId);
                return (
                    <div className="space-y-4 text-sm">
                        <h3 className="font-bold text-lg text-foreground mb-2">Проверьте ваш заказ</h3>
                        <div className="p-4 bg-card rounded-lg space-y-3 ring-1 ring-zinc-800">
                            <div className="flex justify-between items-center"><strong className="text-hint">Категория:</strong> <span className="text-foreground font-medium">{category.title}</span></div>
                             <div className="flex justify-between items-center"><strong className="text-hint">Исполнитель:</strong> <span className="text-foreground font-medium">{category.performer}</span></div>
                            <div className="flex justify-between items-center"><strong className="text-hint">Стиль:</strong> <span className="text-foreground font-medium">{selectedOption?.name} ({selectedOption?.price})</span></div>
                            {orderDetails.uploadedFile && <div className="flex justify-between items-center"><strong className="text-hint">Файл:</strong> <span className="text-foreground font-medium truncate max-w-[200px]">{orderDetails.uploadedFile.name}</span></div>}
                            {orderDetails.textDetails && <div className="mt-2 pt-3 border-t border-zinc-700"><strong className="text-hint">Пожелания:</strong> <p className="text-foreground font-medium whitespace-pre-wrap mt-1">{orderDetails.textDetails}</p></div>}
                        </div>
                        <p className="text-hint text-xs text-center">Нажимая "Оформить заказ", вы соглашаетесь с условиями. Наш менеджер скоро свяжется с вами в Telegram для подтверждения и оплаты.</p>
                    </div>
                );
            default: // also handles 'style' as it's the pre-selection step, though we navigate away if no option is selected
                return <p className="text-hint">Начните с выбора опции на предыдущем шаге.</p>;
        }
    };
    
    // Setup Telegram main button
    useEffect(() => {
        const mainButtonText = currentStep === steps.length - 1 ? "Оформить заказ" : "Далее";
        tg.MainButton.setText(mainButtonText);
        tg.MainButton.show();
        tg.onEvent('mainButtonClicked', handleNext);

        return () => {
            tg.offEvent('mainButtonClicked', handleNext);
            tg.MainButton.hide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, steps.length, tg, orderDetails]);


    return (
        <div className="flex flex-col h-full">
            <div className="mb-6">
                {/* Progress Indicator */}
                 <div className="text-center mb-4">
                    <span className="text-sm font-semibold text-hint">ШАГ {currentStep + 1} ИЗ {steps.length}</span>
                    <h2 className="text-xl font-bold text-foreground">{activeStep.title}</h2>
                    <p className="text-hint text-sm">{activeStep.description}</p>
                </div>
                <div className="w-full bg-card rounded-full h-1.5 ring-1 ring-zinc-800">
                    <div className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
                </div>
            </div>

            <div className="flex-grow">
                {renderStepContent()}
            </div>
        </div>
    );
};

export default OrderPage;
