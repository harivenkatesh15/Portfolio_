/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-style palette
        background: '#F5F5F7', 
        surface: '#FFFFFF',    
        primary: '#1D1D1F',    
        secondary: '#86868B',  
        accent: '#0071E3',     
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
  extend: {
    animation: {
      'scan-slow': 'scan-slow 4s linear infinite',
    },
    keyframes: {
      'scan-slow': {
        '0%': { top: '0%', opacity: '0' },
        '20%': { opacity: '0.5' },
        '80%': { opacity: '0.5' },
        '100%': { top: '100%', opacity: '0' },
      }
    }
  }
}


