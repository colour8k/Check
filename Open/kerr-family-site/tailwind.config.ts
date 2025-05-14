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
        primary: {
          DEFAULT: '#1c3f5f',
          light: '#2c5a8c',
          dark: '#14293d',
        },
        secondary: {
          DEFAULT: '#7c2128',
          light: '#9c353d',
          dark: '#56171c',
        },
        accent: {
          DEFAULT: '#d5b048',
          light: '#e6ca7a',
          dark: '#a88b32',
        },
        background: {
          DEFAULT: '#f7f3e9',
          alt: '#f1ece0',
        },
        text: {
          DEFAULT: '#2a2a2a',
          light: '#555555',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        accent: ['Libre Baskerville', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'vintage-paper': "url('/images/vintage-paper-texture.png')",
        'family-hero': "url('/images/family-hero-bg.png')",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
  },
  plugins: [],
};
export default config;