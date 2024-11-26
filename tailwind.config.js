/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: ['bg-gray', 'bg-blue-500'],
  theme: {
    extend: {},
  },
  plugins: [],
}

