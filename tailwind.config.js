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
      },
      colors: {
        // Input component colors
        'input-bg': 'var(--input-bg, rgba(0,0,0,0.22))',
        'input-border': 'var(--input-border, rgba(255,255,255,0.16))',
        'input-border-hover': 'var(--input-border-hover, rgba(255,255,255,0.19))',
        'input-border-focus': 'var(--input-border-focus, #0073E6)',
        'input-border-error': 'var(--input-border-error, #cf313b)',
        'input-disabled-bg': 'var(--input-disabled-bg, #1e1e1e)',
        'input-disabled-border': 'var(--input-disabled-border, rgba(255,255,255,0.16))',
        'input-placeholder': 'var(--input-placeholder, rgba(255,255,255,0.5))',
        'input-text': 'var(--input-text, #fff)',
        
        // Design System Color Tokens
        // Action Colors
        'action': {
          'primary-bg': '#0084FF',
          'primary-bg-hover': '#2496FF',
          'primary-text': '#ffffff',
          'primary-text-hover': '#ffffff',
          'secondary-bg': 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.11) 100%)',
          'secondary-bg-hover': 'linear-gradient(180deg, rgba(255, 255, 255, 0.19) 0%, rgba(255, 255, 255, 0.17) 100%)',
          'secondary-bg-pressed': 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)',
          'secondary-selected-bg': 'rgba(0, 0, 0, 0.50)',
          'secondary-selected-bg-pressed': 'rgba(0, 0, 0, 0.50)',
          'secondary-text': '#ffffff',
          'secondary-text-hover': '#ffffff',
          'secondary-border': 'rgba(255, 255, 255, 0.13)',
          'secondary-border-hover': 'rgba(255, 255, 255, 0.22)',
        },
        
        // Background Colors
        'bg': {
          'primary': 'var(--bg-primary, #292929)',
          'secondary': 'var(--bg-secondary, #353535)',
          'tertiary': 'var(--bg-tertiary, #404040)',
          'raised': 'var(--bg-raised, rgba(255, 255, 255, 0.07))',
          'inactive': 'var(--bg-inactive, #141414)',
          'inverse': 'var(--bg-inverse, #f5f5f5)',
          'inverse-hover': 'var(--bg-inverse-hover, #f5f5f5)',
        },
        
        // Text Colors
        'text': {
          'primary': 'var(--text-primary, #ffffff)',
          'secondary': 'var(--text-secondary, rgba(255, 255, 255, 0.67))',
          'dimmed': 'var(--text-dimmed, rgba(255, 255, 255, 0.50))',
          'inverse': 'var(--text-inverse, #000000)',
        },
        
        // Border Colors
        'border': {
          'default': 'var(--border-default, #464646)',
          'text-input': 'var(--border-text-input, rgba(255, 255, 255, 0.16))',
          'checkbox-radio': 'var(--border-checkbox-radio, rgba(255, 255, 255, 0.19))',
        },
        
        // Close Button
        'close-button': {
          'bg': 'rgba(255, 255, 255, 0.10)',
        },
        
        // Blue Colors
        'blue': {
          'bg': 'var(--blue-bg, #0084FF)',
          'bg-hover': '#2496FF',
          'bg-pressed': '#0084FF',
          'border': '#0073E6',
          'canvas': '#0073E6',
          'canvas-transparent': 'rgba(0, 115, 230, 0.1)',
          'chart': '#0073E6',
          'chart-2': '#8AC2FF',
          'text': 'var(--blue-text, #8AC2FF)',
          'transparent': 'rgba(0, 115, 230, 0.25)',
          'transparent-hover': 'rgba(0, 115, 230, 0.35)',
          // For backward compatibility with existing blue values
          '50': 'oklch(97% 0.014 254.604)',
          '500': 'oklch(62.3% 0.214 259.815)',
          '600': 'oklch(54.6% 0.245 262.881)',
          '700': 'oklch(48.8% 0.243 264.376)',
          '800': 'oklch(42.4% 0.199 265.638)',
          '900': 'oklch(37.9% 0.146 265.522)',
        },
        
        // Green Colors
        'green': {
          'bg': 'var(--green-bg, #00a457)',
          'bg-hover': '#2FC862',
          'bg-pressed': '#00a457',
          'border': '#008547',
          'canvas': '#008547',
          'canvas-transparent': 'rgba(0, 133, 71, 0.1)',
          'chart': '#63D489',
          'text': 'var(--green-text, #63D489)',
          'transparent': 'rgba(0, 133, 71, 0.25)',
          'transparent-hover': 'rgba(0, 133, 71, 0.35)',
          // For backward compatibility with existing green values
          '50': 'oklch(98.2% 0.018 155.826)',
          '600': 'oklch(62.7% 0.194 149.214)',
          '700': 'oklch(52.7% 0.154 150.069)',
          '800': 'oklch(44.8% 0.119 151.328)',
        },
        
        // Red Colors
        'red': {
          'bg': 'var(--red-bg, #ED273E)',
          'bg-hover': '#FF424D',
          'bg-pressed': '#ED273E',
          'border': '#CF313B',
          'canvas': '#CF313B',
          'canvas-transparent': 'rgba(207, 49, 59, 0.1)',
          'chart': '#FF8A8A',
          'icon': '#FF8A8A',
          'text': 'var(--red-text, #FF8A8A)',
          'transparent': 'rgba(207, 49, 59, 0.25)',
          'transparent-hover': 'rgba(207, 49, 59, 0.35)',
          // For backward compatibility with existing red values
          '500': 'oklch(63.7% 0.237 25.331)',
          '700': 'oklch(50.5% 0.213 27.518)',
        },
        
        // Orange Colors
        'orange': {
          'bg': 'var(--orange-bg, #F85900)',
          'bg-hover': '#F67E28',
          'bg-pressed': '#F85900',
          'border': '#C75300',
          'canvas': '#C75300',
          'canvas-transparent': 'rgba(248, 89, 0, 0.1)',
          'chart': '#C75300',
          'text': 'var(--orange-text, #FFAB66)',
          'transparent': 'rgba(248, 89, 0, 0.2)',
          'transparent-hover': 'rgba(248, 89, 0, 0.3)',
        },
        
        // Purple Colors
        'purple': {
          'bg': 'var(--purple-bg, #8A61FF)',
          'bg-hover': '#A484FF',
          'bg-pressed': '#8A61FF',
          'border': '#7F5AE9',
          'canvas': '#7F5AE9',
          'canvas-transparent': 'rgba(127, 90, 233, 0.1)',
          'chart': '#7F5AE9',
          'chart-2': '#B89EFF',
          'text': 'var(--purple-text, #B89EFF)',
          'transparent': 'rgba(127, 90, 233, 0.25)',
          'transparent-hover': 'rgba(127, 90, 233, 0.35)',
          // For backward compatibility with existing purple values
          '600': 'oklch(55.8% 0.288 302.321)',
          '900': 'oklch(38.1% 0.176 304.987)',
        },
        
        // Pink Colors
        'pink': {
          'bg': 'var(--pink-bg, #E148C0)',
          'bg-hover': '#F775D3',
          'bg-pressed': '#E148C0',
          'border': '#BE4AA5',
          'canvas': '#BE4AA5',
          'canvas-transparent': 'rgba(190, 74, 165, 0.1)',
          'chart': '#BE4AA5',
          'text': 'var(--pink-text, #F7A9F9)',
          'transparent': 'rgba(190, 74, 165, 0.25)',
          'transparent-hover': 'rgba(190, 74, 165, 0.35)',
        },
        
        // Yellow Colors
        'yellow': {
          'bg': 'var(--yellow-bg, #EAA700)',
          'bg-hover': '#63D489',
          'bg-pressed': '#EAA700',
          'border': '#EAA700',
          'canvas': '#EAA700',
          'canvas-transparent': 'rgba(255, 199, 0, 0.1)',
          'chart': '#EAA700',
          'text': 'var(--yellow-text, #EAA700)',
          'transparent': 'rgba(255, 199, 0, 0.15)',
          'transparent-hover': 'rgba(255, 199, 0, 0.25)',
        },
        
        // Gray Colors - Maintain backward compatibility
        'gray': {
          '100': 'oklch(96.7% 0.003 264.542)',
          '200': 'oklch(92.8% 0.006 264.531)',
          '300': 'oklch(87.2% 0.01 258.338)',
          '400': 'oklch(70.7% 0.022 261.325)',
          '500': 'oklch(55.1% 0.027 264.364)',
          '600': 'oklch(44.6% 0.03 256.802)',
          '700': 'oklch(37.3% 0.034 259.733)',
          '800': 'oklch(27.8% 0.033 256.848)',
          '900': 'oklch(21% 0.034 264.665)',
        },
      },
      borderRadius: {
        'input': '4px',
        'xs': '0.125rem',
        DEFAULT: '0.625rem',
      },
      boxShadow: {
        'input': '0px 1px 1px -1px rgba(0,0,0,0.13) inset,0px 3px 3px -3px rgba(0,0,0,0.17) inset,0px 4px 4px -4px rgba(0,0,0,0.17) inset,0px 8px 8px -8px rgba(0,0,0,0.17) inset,0px 12px 12px -12px rgba(0,0,0,0.13) inset,0px 16px 16px -16px rgba(0,0,0,0.13) inset',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '5xl': '3rem',
        '7xl': '4.5rem',
        'input': '0.72rem',
        'body': '0.72rem',  // 11.5px
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'input': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'input': '-0.01em',
        'widest': '0.1em',
        'body': '-0.01em',  // -1%
      },
      height: {
        'input': '24px',
      },
      opacity: {
        'input-disabled': '0.4',
      },
      spacing: {
        DEFAULT: '0.25rem',
      },
      lineHeight: {
        'xs': 'calc(1 / 0.75)',
        'sm': 'calc(1.25 / 0.875)',
        'lg': 'calc(1.75 / 1.125)',
        'xl': 'calc(1.75 / 1.25)',
        '2xl': 'calc(2 / 1.5)',
        '3xl': 'calc(2.25 / 1.875)',
        '5xl': '1',
        '7xl': '1',
        'body': '13px',  // 13px line height
      },
      fontWeight: {
        'normal': '300',
        'medium': '500',
        'semibold': '600', 
        'bold': '700',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} 