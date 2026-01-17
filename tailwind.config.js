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
        // Surface layers
        'surface-0': 'var(--surface-0)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        'surface-4': 'var(--surface-4)',

        // Text hierarchy
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'tertiary': 'var(--text-tertiary)',

        // Borders
        'subtle': 'var(--border-subtle)',
        'default': 'var(--border-default)',
        'strong': 'var(--border-strong)',

        // Category colors
        'category-marketing': 'var(--category-marketing)',
        'category-sales': 'var(--category-sales)',
        'category-projects': 'var(--category-projects)',

        // Accent colors
        'accent-primary': 'var(--accent-primary)',
        'accent-primary-hover': 'var(--accent-primary-hover)',
        'accent-primary-muted': 'var(--accent-primary-muted)',

        // Status colors
        'status-active': 'var(--status-active)',
        'status-completed': 'var(--status-completed)',
        'status-overdue': 'var(--status-overdue)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)',
      },
      fontSize: {
        'page-title': ['26px', { lineHeight: '1.25', fontWeight: '600' }],
        'section-title': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        'card-title': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['15px', { lineHeight: '1.55', fontWeight: '400' }],
        'label': ['13px', { lineHeight: '1.5', fontWeight: '500' }],
        'metadata': ['11px', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
