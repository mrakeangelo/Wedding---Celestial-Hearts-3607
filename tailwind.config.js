/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          deep: '#1a1b3e',
          twilight: '#2d1b69',
          plum: '#663399',
          champagne: '#f7e7ce',
          silver: '#c0c5d4',
          rose: '#e8b4a0',
          gold: '#d4af37',
          midnight: '#0f0f23',
          nebula: '#4a148c',
          stardust: '#e1bee7'
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'cosmic': ['Inter', 'sans-serif'],
        'script': ['Dancing Script', 'cursive']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'constellation': 'constellation 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        constellation: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        }
      },
      backgroundImage: {
        'starfield': 'radial-gradient(circle at 25% 25%, #4a148c 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1b3e 0%, transparent 50%)',
        'cosmic-gradient': 'linear-gradient(135deg, #1a1b3e 0%, #2d1b69 25%, #663399 50%, #4a148c 75%, #1a1b3e 100%)',
        'moon-glow': 'radial-gradient(circle, rgba(247, 231, 206, 0.3) 0%, transparent 70%)'
      }
    },
  },
  plugins: [],
}