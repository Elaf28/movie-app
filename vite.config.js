/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; // 1. استوردي مكتبة path

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: {
      // 2. استخدمي path.resolve لضمان كتابة المسار بشكل صحيح على ويندوز
      '@': path.resolve(__dirname, './src'),
    },
  },
});