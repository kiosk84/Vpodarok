
import { useEffect, useState } from 'react';

// Make Telegram's WebApp type available globally
declare global {
    interface Window {
        Telegram: {
            WebApp: any;
        }
    }
}

export function useTelegram() {
    const tg = window.Telegram.WebApp;
    const [colorScheme, setColorScheme] = useState(tg.colorScheme);

    useEffect(() => {
        const handleThemeChange = () => {
            setColorScheme(tg.colorScheme);
        };
        
        tg.onEvent('themeChanged', handleThemeChange);
        
        return () => {
            tg.offEvent('themeChanged', handleThemeChange);
        };
    }, [tg]);
    
    return {
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        colorScheme,
    };
}