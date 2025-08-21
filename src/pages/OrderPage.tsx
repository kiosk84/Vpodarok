
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useServices } from '../context/ServiceContext';
import { useOrder } from '../context/OrderContext';
import { useTelegram } from '../hooks/useTelegram';

const OrderPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const { tg } = useTelegram();
    const { orderDetails, setOrderDetails, resetOrder } = useOrder();
    const { services } = useServices();

    const service = services.find(c => c.id === serviceId);
    
    useEffect(() => {
        if (serviceId && !orderDetails.serviceId) {
            setOrderDetails(prev => ({...prev, serviceId: serviceId}));
        }
    }, [serviceId, setOrderDetails, orderDetails.serviceId]);

    const handleSubmit = () => {
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
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setOrderDetails(prev => ({...prev, uploadedFile: e.target.files![0]}));
        }
    };
    
    useEffect(() => {
        tg.MainButton.setText("Оформить заказ");
        tg.MainButton.show();
        tg.onEvent('mainButtonClicked', handleSubmit);

        return () => {
            tg.offEvent('mainButtonClicked', handleSubmit);
            tg.MainButton.hide();
        }
    }, [tg, orderDetails, handleSubmit]);

    if (!service) {
        return <div className="text-center">Услуга не найдена.</div>;
    }

    return (
        <div className="space-y-6">
             <h2 className="text-xl font-bold text-foreground text-center">Оформление заказа</h2>
            
            <div className="p-4 bg-card rounded-lg space-y-3 ring-1 ring-zinc-800 text-sm">
                <div className="flex justify-between items-center"><strong className="text-hint">Услуга:</strong> <span className="text-foreground font-medium">{service.title}</span></div>
                <div className="flex justify-between items-center"><strong className="text-hint">Исполнитель:</strong> <span className="text-foreground font-medium">{service.performerName}</span></div>
            </div>

            <div className="space-y-4">
                 <div>
                    <label htmlFor="details" className="block text-sm font-medium text-foreground mb-1">Ваши пожелания</label>
                    <textarea 
                        id="details"
                        className="w-full p-3 border border-zinc-700 rounded-md bg-card text-foreground focus:ring-2 focus:ring-link focus:outline-none transition-shadow"
                        rows={5}
                        placeholder="Опишите ваши пожелания, прикрепите референсы или любую другую важную информацию..."
                        value={orderDetails.textDetails}
                        onChange={(e) => setOrderDetails(prev => ({...prev, textDetails: e.target.value}))}
                        aria-label="Поле для ввода деталей заказа"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Прикрепить файл (необязательно)</label>
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-zinc-600 rounded-lg text-center">
                         <ArrowUpTrayIcon className="w-10 h-10 text-hint mb-3"/>
                         <label htmlFor="file-upload" className="cursor-pointer bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                             Выбрать файл
                         </label>
                         <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                         {orderDetails.uploadedFile ? (
                            <p className="mt-3 text-sm text-foreground">Выбрано: <span className="font-semibold">{orderDetails.uploadedFile.name}</span></p>
                         ) : (
                            <p className="mt-2 text-xs text-hint">Макс. размер файла: 10МБ</p>
                         )}
                    </div>
                </div>
            </div>

            <p className="text-hint text-xs text-center pt-2">Нажимая "Оформить заказ", вы соглашаетесь с условиями. Наш менеджер скоро свяжется с вами в Telegram для подтверждения и оплаты.</p>

        </div>
    );
};

export default OrderPage;