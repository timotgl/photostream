import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config: UserConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
};

const definedConfig = defineConfig(config);

export default definedConfig;
