import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          alt: '#f8f8f8',
          card: '#ffffff',
        },
        accent: {
          beige: '#EADDCD',
          blue: '#C4D7E0',
          dark: '#111111',
        },
        text: {
          primary: '#111111',
          secondary: '#333333',
          muted: '#666666',
        },
        border: {
          DEFAULT: '#111111',
          light: '#e0e0e0',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'], // Very tight tracking, bold
        body:    ['Inter', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'], // Typewriter/editorial feel
        prose:   ['Crimson Pro', 'serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
        arch: '12rem 12rem 0 0', // For the arched images
      },
      boxShadow: {
        brutalist: '4px 4px 0px 0px rgba(17,17,17,1)',
        'brutalist-hover': '6px 6px 0px 0px rgba(17,17,17,1)',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'marquee': 'marquee 20s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
