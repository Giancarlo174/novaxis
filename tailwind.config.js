/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
        // sm, md, lg, xl mantienen sus valores por defecto
      },
      colors: {
        'novaxis': {
          'primary': '#4A90E2',    // Azul primario del logo
          'secondary': '#6BB6FF',  // Azul secundario más claro
          'dark': '#2C5282',       // Azul oscuro para hover/bordes
          'light': '#E6F3FF',      // Azul muy claro para backgrounds
          'gradient-start': '#4A90E2',
          'gradient-end': '#6BB6FF',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-family-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
        heading: ['var(--font-family-heading)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-left': 'slideLeft 0.8s ease-out',
        'slide-right': 'slideRight 0.8s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(74, 144, 226, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(74, 144, 226, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'novaxis-gradient': 'linear-gradient(135deg, #4A90E2 0%, #6BB6FF 100%)',
        'novaxis-gradient-reverse': 'linear-gradient(135deg, #6BB6FF 0%, #4A90E2 100%)',
      },
      boxShadow: {
        'novaxis': '0 10px 25px rgba(74, 144, 226, 0.15)',
        'novaxis-lg': '0 20px 40px rgba(74, 144, 226, 0.2)',
        'novaxis-xl': '0 25px 50px rgba(74, 144, 226, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '32px',
        '4xl': '40px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
