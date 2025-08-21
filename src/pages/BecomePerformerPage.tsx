
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    ChevronLeftIcon, UserCircleIcon, PhotoIcon, SparklesIcon as SparklesIconOutline, 
    TagIcon, CurrencyDollarIcon, ClockIcon, BriefcaseIcon 
} from '@heroicons/react/24/outline';
import { useServices } from '../context/ServiceContext';
import { useTelegram } from '../hooks/useTelegram';
import type { Service } from '../types';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BecomePerformerPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const { addService } = useServices();
    const { user, tg } = useTelegram();
    
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [serviceImagePreview, setServiceImagePreview] = useState<string | null>(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);


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

    const handleGenerateTitles = async () => {
        const keywords = prompt("Введите несколько ключевых слов о вашей услуге (например, 'портрет по фото акварелью'):");
        if (!keywords) return;
        setIsGenerating(true);
        setGeneratedTitles([]);
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Создай 5 коротких, привлекательных и креативных названий для услуги фрилансера на маркетплейсе. Ключевые слова: "${keywords}". Названия должны быть на русском языке.`,
            });
            const text = response.text;
            const titles = text.split('\n').map((t: string) => t.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
            setGeneratedTitles(titles);
        } catch (error) {
            console.error("Error generating titles:", error);
            tg.showAlert('Не удалось сгенерировать названия. Попробуйте еще раз.');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleGenerateDescription = async () => {
        if (!title) {
            tg.showAlert('Сначала введите или сгенерируйте название услуги.');
            return;
        }
        setIsGenerating(true);
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Напиши подробное, структурированное и продающее описание для услуги с названием "${title}". Описание должно быть на русском языке и подходить для публикации на маркетплейсе. Включи разделы: "Что вы получите?", "Как происходит работа?", "Почему стоит выбрать меня?". Сделай его дружелюбным и профессиональным.`,
            });
            setDescription(response.text.trim());
        } catch (error) {
            console.error("Error generating description:", error);
            tg.showAlert('Не удалось сгенерировать описание. Попробуйте еще раз.');
        } finally {
            setIsGenerating(false);
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
        const tagsString = formData.get('tags') as string;

        const newService: Omit<Service, 'id' | 'status'> = {
            title: formData.get('service-title') as string,
            description: formData.get('service-description') as string,
            imageUrl: serviceImagePreview,
            performerName: formData.get('name') as string,
            performerBio: formData.get('bio') as string,
            performerAvatarUrl: avatarPreview,
            performerId: user.id,
            category: formData.get('category') as string,
            tags: tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [],
            price: Number(formData.get('price')),
            turnaroundTime: formData.get('turnaroundTime') as string,
        };
        
        addService(newService);

        tg.showAlert('Ваша заявка отправлена на модерацию! Вы будете перенаправлены в личный кабинет.');
        navigate('/performer-dashboard');
    };

    const InputField = ({ id, label, type = 'text', placeholder, icon: Icon, required = true, helperText }: { id: string, label: string, type?: string, placeholder: string, icon: React.ElementType, required?: boolean, helperText?: string }) => (
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
                    required={required}
                />
            </div>
            {helperText && <p className="mt-1 text-xs text-hint">{helperText}</p>}
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

                <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                    
                    <details className="bg-card rounded-lg ring-1 ring-zinc-800" open>
                        <summary className="p-4 font-semibold text-lg text-foreground cursor-pointer">1. Информация о вас</summary>
                        <div className="p-4 border-t border-zinc-700 space-y-4">
                            <InputField id="name" label="Ваше имя или псевдоним" placeholder="Артем Пономарев" icon={UserCircleIcon} />
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-1">Краткая биография</label>
                                <textarea id="bio" name="bio" rows={3} className="block w-full rounded-md border-0 bg-background py-2 px-3 text-foreground ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" placeholder="Превращаю фото в вечные воспоминания на холсте..." required/>
                            </div>
                            <FileUploadField id="avatar-upload" label="Ваш аватар" preview={avatarPreview} onChange={(e) => handleFileChange(e, setAvatarPreview)} />
                        </div>
                    </details>

                    <details className="bg-card rounded-lg ring-1 ring-zinc-800" open>
                        <summary className="p-4 font-semibold text-lg text-foreground cursor-pointer">2. Описание вашей услуги</summary>
                         <div className="p-4 border-t border-zinc-700 space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label htmlFor="service-title" className="block text-sm font-medium text-foreground">Название услуги</label>
                                    <button type="button" onClick={handleGenerateTitles} disabled={isGenerating} className="flex items-center gap-1 text-xs text-link hover:text-primary disabled:text-hint transition-colors">
                                        {isGenerating ? 'Генерация...' : 'Помощник AI'}
                                        <SparklesIconOutline className="h-4 w-4" />
                                    </button>
                                </div>
                                <input type="text" name="service-title" id="service-title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border-0 bg-background py-2.5 px-3 text-foreground ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" placeholder="Портреты на холсте" required />
                                {generatedTitles.length > 0 && (
                                    <div className="mt-2 p-3 bg-background/50 rounded-lg space-y-2 ring-1 ring-zinc-700">
                                        <p className="text-xs text-hint">Выберите один из вариантов:</p>
                                        {generatedTitles.map((t, i) => (
                                            <button key={i} type="button" onClick={() => { setTitle(t); setGeneratedTitles([]); }} className="block w-full text-left text-sm p-2 rounded-md hover:bg-card transition-colors">
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label htmlFor="service-description" className="block text-sm font-medium text-foreground">Подробное описание</label>
                                    <button type="button" onClick={handleGenerateDescription} disabled={!title || isGenerating} className="flex items-center gap-1 text-xs text-link hover:text-primary disabled:text-hint transition-colors">
                                       {isGenerating ? 'Генерация...' : 'Помощник AI'}
                                       <SparklesIconOutline className="h-4 w-4" />
                                    </button>
                                </div>
                                <textarea id="service-description" name="service-description" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full rounded-md border-0 bg-background py-2 px-3 text-foreground ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm" placeholder="Закажите эксклюзивный портрет на холсте по фото..." required/>
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
                    </details>

                    <details className="bg-card rounded-lg ring-1 ring-zinc-800" open>
                        <summary className="p-4 font-semibold text-lg text-foreground cursor-pointer">3. Детали и стоимость</summary>
                         <div className="p-4 border-t border-zinc-700 space-y-4">
                            <InputField id="category" label="Категория" placeholder="Портреты и иллюстрации" icon={BriefcaseIcon} />
                            <InputField id="tags" label="Теги" placeholder="подарок, иллюстрация, акварель" icon={TagIcon} required={false} helperText="Перечислите через запятую"/>
                            <InputField id="price" label="Базовая цена, ₽" type="number" placeholder="2500" icon={CurrencyDollarIcon} />
                            <InputField id="turnaroundTime" label="Срок выполнения" placeholder="3-5 рабочих дней" icon={ClockIcon} />
                         </div>
                    </details>
                    
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