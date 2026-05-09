/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
colors: {
  background: 'rgb(var(--color-background) / <alpha-value>)',
  foreground: 'rgb(var(--color-foreground) / <alpha-value>)',

  primary: 'rgb(var(--color-primary) / <alpha-value>)',
  'primary-foreground': 'rgb(var(--color-primary-foreground) / <alpha-value>)',

  secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
  'secondary-foreground': 'rgb(var(--color-secondary-foreground) / <alpha-value>)',

  accent: 'rgb(var(--color-accent) / <alpha-value>)',
  'accent-foreground': 'rgb(var(--color-accent-foreground) / <alpha-value>)',

  border: 'rgb(var(--color-border) / <alpha-value>)',
  input: 'rgb(var(--color-input) / <alpha-value>)',
  ring: 'rgb(var(--color-ring) / <alpha-value>)',

  muted: 'rgb(var(--color-muted) / <alpha-value>)',
  'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
},
      borderRadius: {
        lg: 'var(--radius)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.50)',
      },
      backdropBlur: {
        'glass': 'backdrop-filter: blur(4px)',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
