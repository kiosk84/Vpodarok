import React from 'react';

const LoadingPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <h1 className="mt-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                VPodarke
            </h1>
            <p className="mt-2 text-sm text-hint">Загружаем мир уникальных подарков...</p>
        </div>
    );
};

export default LoadingPage;
