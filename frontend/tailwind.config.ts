import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: { 900: '#0a0a0f', 800: '#13131f', 700: '#1a1a2e', 600: '#252540' },
        accent: { cyan: '#00f0ff', purple: '#a855f7', green: '#22c55e', red: '#ef4444' }
      }
    }
  },
  plugins: []
};

export default config;
