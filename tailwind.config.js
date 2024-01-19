/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a4bea',
        highlight:'#F0F0F0',
        bgGray: '#FFFFFF',
        redButton:'#D21F3C',
        darkButton:'#22222'

      },
    },
  },
  plugins: [],
}
