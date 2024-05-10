import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server:{
     port: 3000,
   },
   define:{
    'process.env.VITE_KEY' : JSON.stringify(process.env.VITE_KEY)
  }
})
