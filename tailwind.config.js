/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': '#1F2937',
        'color-accent': '#3B82F6',
        'color-text': '#F4F4F9',
        // 'color-primary': '#0F172A',
        // 'color-accent': '#3B82F6',
        // 'color-text': '#E2E8F0',
        // 'color-primary': '#F3F4F6',
        // 'color-accent': '#FF6F61',
        // 'color-text': '#1F2937',

        // 'color-primary': '#E9ECEF',
        // 'color-accent': '#FFB400',
        // 'color-text': '#1F2937',
      },
      fontFamily: {
        "Montserrat ": ["Montserrat "],
        "Open-Sans": ["Open Sans"],

        // 'Oswald': ["Oswald"]
        // 'Nunito': ["Nunito"],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}