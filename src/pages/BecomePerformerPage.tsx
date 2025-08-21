
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, UserCircleIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useServices } from '../context/ServiceContext';
import { useTelegram } from '../hooks/useTelegram';
import type { Service } from '../types';

const BecomePerformerPage: React.FC = () => {
    const navigate = useNavigate();
    const { addService } = useServices();
    const { user, tg } = useTelegram();
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [serviceImagePreview, setServiceImagePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImagePreview: (url: string | null) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!user) {
            tg.showAlert('Не удалось определить пользователя. Пожалуйста, перезапустите приложение.');
            return;
        }
        if (!avatarPreview || !serviceImagePreview) {
            tg.showAlert('Пожалуйста, загрузите все необходимые изображения.');
            return;
        }

        const formData = new FormData(e.currentTarget);
        const newService: Omit<Service, 'id' | 'status'> = {
            title: formData.get('service-title') as string,
            description: formData.get('service-description') as string,
            imageUrl: serviceImagePreview,
            performerName: formData.get('name') as string,
            performerBio: formData.get('bio') as string,
            performerAvatarUrl: avatarPreview,
            performerId: user.id,
        };
        
        addService(newService);

        tg.showAlert('Ваша заявка отправлена на модерацию! Вы будете перенаправлены в личный кабинет.');
        navigate('/performer-dashboard');
    };

    const InputField = ({ id, label, type = 'text', placeholder, icon: Icon }: { id: string, label: string, type?: string, placeholder: string, icon: React.ElementType }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
                {label}
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className="h-5 w-5 text-hint" aria-hidden="true" />
                </div>
                <input
                    type={type}
                    name={id}
                    id={id}
                    className="block w-full rounded-md border-0 bg-card py-2.5 pl-10 text-foreground ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                    placeholder={placeholder}
                    required
                />
            </div>
        </div>
    );
    
     const FileUploadField = ({ id, label, preview, onChange }: { id: string, label: string, preview: string | null, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <div>
            <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
            <div className="mt-2 flex items-center gap-x-3">
                {preview ? (
                     <img src={preview} alt="Preview" className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/50" />
                ) : (
                    <UserCircleIcon className="h-16 w-16 text-hint" aria-hidden="true" />
                )}
                <label htmlFor={id} className="cursor-pointer rounded-md bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-zinc-700 hover:bg-background">
                    <span>Загрузить фото</span>
                    <input id={id} name={id} type="file" className="sr-only" onChange={onChange} accept="image/*" required />
                </label>
            </div>
        </div>
    );

    return (
        <div className="bg-background min-h-screen text-foreground font-sans">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center h-16 border-b border-zinc-700">
                <button onClick={() => navigate(-1)} className="text-link p-2 rounded-full hover:bg-background/50 transition-colors">
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-bold text-foreground truncate flex-grow text-center">
                    Стать исполнителем
                </h1>
                <div className="w-10"></div>
            </header>

            <main className="p-4 pb-12">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Присоединяйтесь к нашей команде!</h2>
                    <p className="text-hint mt-1">Расскажите о себе и своем таланте, чтобы начать получать заказы.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                    {/* Performer Info */}
                    <div className="space-y-4 p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                        <h3 className="font-semibold text-lg text-foreground">1. Информация о вас</h3>
                        <InputField id="name" label="Ваше имя или псевдоним" placeholder="Артем Пономарев" icon={UserCircleIcon} />
                        <div>
                             <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-1">
                                Краткая биография
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows={3}
                                className="block w-full rounded-md border-0 bg-card py-2 px-3 text-foreground ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                                placeholder="Превращаю фото в вечные воспоминания на холсте..."
                                required
                            />
                        </div>
                        <FileUploadField id="avatar-upload" label="Ваш аватар" preview={avatarPreview} onChange={(e) => handleFileChange(e, setAvatarPreview)} />
                    </div>

                    {/* Service Info */}
                     <div className="space-y-4 p-4 bg-card rounded-lg ring-1 ring-zinc-800">
                        <h3 className="font-semibold text-lg text-foreground">2. Описание вашей услуги</h3>
                         <InputField id="service-title" label="Название услуги" placeholder="Портреты на холсте" icon={SparklesIcon} />
                         <div>
                             <label htmlFor="service-description" className="block text-sm font-medium text-foreground mb-1">
                                Подробное описание
                            </label>
                            <textarea
                                id="service-description"
                                name="service-description"
                                rows={4}
                                className="block w-full rounded-md border-0 bg-card py-2 px-3 text-foreground ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                                placeholder="Закажите эксклюзивный портрет на холсте по фото..."
                                required
                            />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-foreground mb-2">Основное изображение услуги</label>
                           <label htmlFor="service-image-upload" className="relative cursor-pointer block w-full h-48 border-2 border-dashed border-zinc-600 rounded-lg flex justify-center items-center text-center hover:border-primary transition-colors">
                                {serviceImagePreview ? (
                                    <img src={serviceImagePreview} alt="Service preview" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-hint" aria-hidden="true" />
                                        <span className="mt-2 block text-sm font-semibold text-foreground">Нажмите, чтобы загрузить</span>
                                    </div>
                                )}
                                <input id="service-image-upload" name="service-image-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, setServiceImagePreview)} accept="image/*" required />
                            </label>
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                        >
                            Отправить заявку
                        </button>
                        <p className="text-xs text-hint text-center mt-3">
                            Нажимая кнопку, вы соглашаетесь с условиями платформы. Ваша заявка будет рассмотрена модератором.
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default BecomePerformerPage;