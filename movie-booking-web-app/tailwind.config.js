/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06070d',
        ember: '#f76637',
        velvet: '#11131c',
        champagne: '#f3d1a7',
        mist: '#9aa6c2'
      },
      fontFamily: {
        display: ['"Segoe UI"', 'system-ui', 'sans-serif'],
        body: ['"Trebuchet MS"', '"Segoe UI"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 24px 60px rgba(247, 102, 55, 0.18)'
      },
      backgroundImage: {
        spotlight: 'radial-gradient(circle at top, rgba(247,102,55,0.25), transparent 35%), radial-gradient(circle at 80% 20%, rgba(84,99,255,0.14), transparent 28%)'
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        rise: 'rise 700ms ease-out both'
      }
    }
  },
  plugins: []
};
