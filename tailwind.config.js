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
        'color-accent': '#FFC857',
        'color-text': '#F4F4F9',
        // 'color-primary': '#0F172A',
        // 'color-accent': '#3B82F6',
        // 'color-text': '#E2E8F0',
      },
      fontFamily: {
        "Montserrat ": ["Montserrat "],
        "Open-Sans": ["Open Sans"],

        // 'Nunito': ["Nunito"],
        // 'Oswald': ["Oswald"]
      }
    },
  },
  plugins: [],
}