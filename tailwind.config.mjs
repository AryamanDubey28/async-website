import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      colors: {
        // New premium color palette
        background: {
          DEFAULT: '#050508',
          secondary: '#0a0f1c',
          tertiary: '#0f1629',
        },
        foreground: {
          DEFAULT: '#ffffff',
          muted: '#94a3b8',
          subtle: '#64748b',
        },
        // Primary accent - Violet/Indigo
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Secondary - Cyan/Blue
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        // Keeping some grays for compatibility
        gray: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        },
        // Glass tints
        glass: {
          white: 'rgba(255, 255, 255, 0.03)',
          violet: 'rgba(139, 92, 246, 0.1)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      animation: {
        // Aurora effects
        'aurora': 'aurora 15s ease infinite',
        'aurora-slow': 'aurora 25s ease infinite',
        'aurora-fast': 'aurora 8s ease infinite',
        // Gradient border
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'gradient-shift-slow': 'gradient-shift 6s ease infinite',
        // Glow pulse
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'glow-pulse-slow': 'glow-pulse 4s ease-in-out infinite',
        // Float animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        // Shimmer effect
        'shimmer': 'shimmer 2s ease infinite',
        // Text reveal
        'text-reveal': 'text-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        // Fade up
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-up-delayed': 'fade-up 0.6s ease-out forwards 0.2s',
        // Scale in
        'scale-in': 'scale-in 0.5s ease-out forwards',
        // Spin variations
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        // Existing animations kept for compatibility
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'gradient-shift': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-20px) rotate(2deg)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        'text-reveal': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'fade-up': {
          '0%': {
            transform: 'translateY(30px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'scale-in': {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Aurora gradients
        'aurora-1': 'linear-gradient(-45deg, #050508, #1e1b4b, #312e81, #050508)',
        'aurora-2': 'linear-gradient(45deg, #0f1629, #4c1d95, #1e1b4b, #0f1629)',
        // Glass gradient
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        // Shimmer
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      boxShadow: {
        // Glow shadows
        'glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 35px -5px rgba(139, 92, 246, 0.5)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-white': '0 0 25px -5px rgba(255, 255, 255, 0.2)',
        // Glass shadow
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        // Inner glow
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    typography,
  ],
};
