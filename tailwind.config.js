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
        fondolog:'#17A833'
        
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite', // Cambia la duración a 3 segundos o el valor deseado
      },
      fontFamily: {
        custom: ['The Seasons',], // Define la fuente personalizada
        montserrat_alternates: ['Montserrat Alternates', 'sans-serif'],
      },
      textColor: {
        custom: '#643F6A',
        azullog:'#6083DA' // Define el color personalizado
      },
    },
  },
  // Otras configuraciones de Tailwind CSS
};
