/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#0f0f13',
          800: '#18181d',
          700: '#25252d',
          600: '#3a3a44',
        },
      },
    },
  },
  plugins: [],
}
