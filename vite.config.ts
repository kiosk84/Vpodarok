import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { process } from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения для текущего режима
  // Третий параметр '' позволяет загружать все переменные, а не только с префиксом VITE_
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Явно "пробрасываем" переменную в клиентский код
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    }
  }
})
