/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        custom: '#C3D7BE',
      },
      fontFamily: {
        custom: ['The Seasons', 'sans'], // Define la fuente personalizada
      },
      textColor: {
        custom: '#643F6A', // Define el color personalizado
      },
    },
  },
  // Otras configuraciones de Tailwind CSS
};
