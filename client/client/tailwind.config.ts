import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5ff',
        'primary-dark': '#0284c7',
        accent: '#7c3aed',
        success: '#16a34a',
        danger: '#ef4444',
        muted: '#6b7280',
      },
      boxShadow: {
        'shadow-1': '0 6px 18px rgba(2,6,23,0.08)',
        'shadow-2': '0 2px 8px rgba(2,6,23,0.06)',
      },
    },
  },
  plugins: [],
}
export default config
