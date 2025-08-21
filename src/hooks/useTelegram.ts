
import { useEffect, useState } from 'react';

// Make Telegram's WebApp type available globally
declare global {
    interface Window {
        Telegram: {
            WebApp: any;
        }
    }
}

// For local development and testing
const isDev = !window.Telegram?.WebApp?.initData;

const mockUser = {
    id: 999999999, // IMPORTANT: This ID is used as the Admin ID for testing
    first_name: 'Admin',
    last_name: 'Dev',
    username: 'admin_dev',
    language_code: 'en',
};

export const ADMIN_USER_ID = 999999999;

export function useTelegram() {
    const tg = window.Telegram?.WebApp;
    const [colorScheme, setColorScheme] = useState(tg?.colorScheme || 'dark');

    useEffect(() => {
        if (!isDev) {
            const handleThemeChange = () => {
                setColorScheme(tg.colorScheme);
            };
            tg.onEvent('themeChanged', handleThemeChange);
            return () => {
                tg.offEvent('themeChanged', handleThemeChange);
            };
        }
    }, [tg]);
    
    return {
        tg: tg || {},
        user: isDev ? mockUser : tg?.initDataUnsafe?.user,
        queryId: isDev ? 'dev_query' : tg?.initDataUnsafe?.query_id,
        colorScheme,
    };
}