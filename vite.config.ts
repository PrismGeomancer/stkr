import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:process.env.STICKER_BASE_PATH || './',plugins:[react()],worker:{format:'es'},build:{target:'es2022'},server:{host:'127.0.0.1',port:5173}});
