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
        bgla:'#6083DA',
        fondolog:'#15A331'
      },
      fontFamily: {
        custom: ['The Seasons',], // Define la fuente personalizada
      },
      textColor: {
        custom: '#643F6A',
        azullog:'#6083DA' // Define el color personalizado
      },
    },
  },
  // Otras configuraciones de Tailwind CSS
};
