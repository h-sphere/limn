import { defineConfig } from 'vite';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  base: './',
  plugins: [/*monacoEditorPlugin({
    languageWorkers: ['typescript']
  })*/, vue()],
});