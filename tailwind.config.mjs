import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          400: '#4fd1c5',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
        },
        gray: {
          900: '#171923',
          800: '#1A202C',
          700: '#2D3748',
          600: '#4A5568',
          400: '#A0AEC0',
          300: '#CBD5E0',
          200: '#E2E8F0',
          100: '#EDF2F7',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse-slow': 'spin-reverse 12s linear infinite',
        'float-1': 'floating1 3s ease-in-out infinite',
        'float-2': 'floating2 4s ease-in-out infinite',
        'float-3': 'floating3 5s ease-in-out infinite',
        'float-4': 'floating4 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 7s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scanner': 'scanner 3s ease-in-out infinite',
        'scanner-vertical': 'scanner-vertical 4s ease-in-out infinite',
        'data-stream': 'data-stream 8s ease-in-out infinite',
        'data-stream-alt': 'data-stream 10s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'dash-slow': 'dash 15s linear infinite',
        'dash-slow-reverse': 'dash-reverse 15s linear infinite',
      },
      keyframes: {
        floating1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floating2: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(5px, -10px)' },
          '50%': { transform: 'translate(10px, 5px)' },
          '75%': { transform: 'translate(-5px, 10px)' },
        },
        floating3: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'translate(-5px, -5px) rotate(-2deg)' },
          '66%': { transform: 'translate(5px, 5px) rotate(2deg)' },
        },
        floating4: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-5px, -10px) scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        scanner: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        'scanner-vertical': {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        'data-stream': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '20%': { opacity: 0.8 },
          '80%': { opacity: 0.8 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'dash': {
          '0%': { strokeDashoffset: 0 },
          '100%': { strokeDashoffset: 100 },
        },
        'dash-reverse': {
          '0%': { strokeDashoffset: 0 },
          '100%': { strokeDashoffset: -100 },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'teal-glow': '0 0 15px 2px rgba(56, 178, 172, 0.3)',
        'teal-glow-lg': '0 0 25px 5px rgba(56, 178, 172, 0.4)',
      },
    },
  },
  plugins: [
    typography,
  ],
}; 