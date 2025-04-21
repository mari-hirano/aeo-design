/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        textShimmer: {
          '0%, 100%': { color: '#CCCCCC' },
          '50%': { color: '#666666' }
        }
      },
      animation: {
        'textShimmer': 'textShimmer 2s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} 