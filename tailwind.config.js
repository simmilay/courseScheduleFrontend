/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // Vuetify'ın reset'i ile çakışmayı önler
  },

  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
