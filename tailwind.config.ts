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
        /* Dark cinematic palette */
        bg: {
          DEFAULT: '#080808',
          alt:     '#111111',
          card:    'rgba(255,255,255,0.06)',
        },
        accent: {
          beige: 'rgba(255,220,150,0.15)',
          blue:  'rgba(150,200,255,0.15)',
          dark:  '#ffffff',
          gold:  '#c9a84c',
        },
        text: {
          primary:   'rgba(255,255,255,0.92)',
          secondary: 'rgba(255,255,255,0.65)',
          muted:     'rgba(255,255,255,0.40)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          light:   'rgba(255,255,255,0.06)',
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
        glass:         '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)',
        'glass-hover': '0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.12)',
        /* keep compat aliases */
        brutalist:       '0 8px 32px rgba(0,0,0,0.4)',
        'brutalist-hover': '0 20px 60px rgba(0,0,0,0.5)',
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
