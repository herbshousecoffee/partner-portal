/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'herbs-blue': '#0057B7',
        'herbs-blue-dark': '#004494',
        'surface': '#FFFFFF',
        'background': '#FAFAFA',
        'border': '#E5E7EB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'small': '0 1px 3px rgba(0,0,0,0.1)',
        'medium': '0 4px 12px rgba(0,0,0,0.1)',
        'large': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
