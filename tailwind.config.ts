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
        /* Warm paper, ink, and soft sage palette */
        bg: {
          DEFAULT: '#f7f3e9',
          alt:     '#fffdf7',
          card:    'rgba(45,61,49,0.035)',
        },
        ink: '#26332d',
        accent: {
          beige: 'rgba(182,126,52,0.12)',
          blue:  'rgba(90,125,153,0.12)',
          dark:  '#d2dfc9',
          gold:  '#a96d32',
        },
        text: {
          primary:   '#26332d',
          secondary: 'rgba(38,51,45,0.76)',
          muted:     'rgba(38,51,45,0.58)',
        },
        border: {
          DEFAULT: 'rgba(45,61,49,0.14)',
          light:   'rgba(45,61,49,0.08)',
        },
      },
      fontFamily: {
        display: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body:    ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
        prose:   ['Crimson Pro', 'serif'],
        silk:    ['Silkscreen', 'cursive'],
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        full: '9999px',
        arch: '12rem 12rem 0 0',
      },
      boxShadow: {
        glass:         '0 8px 28px rgba(59,48,31,0.1), inset 0 0 0 1px rgba(45,61,49,0.06)',
        'glass-hover': '0 18px 44px rgba(59,48,31,0.15), inset 0 0 0 1px rgba(45,61,49,0.09)',
        /* keep compat aliases */
        brutalist:       '0 8px 28px rgba(59,48,31,0.1)',
        'brutalist-hover': '0 18px 44px rgba(59,48,31,0.15)',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        'marquee':   'marquee 24s linear infinite',
        'fade-up':   'nexum-rise 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'card-rise': 'card-rise 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'page-enter':'page-enter 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'nexum-rise': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'card-rise': {
          from: { opacity: '0', transform: 'translateY(20px) scale(0.97)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'page-enter': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
