import { useEffect, useState } from "react";
import CardCoursesMas from "../Components/CardCoursesMas";
import CardMuestras from "../Components/CardMuestras";
import carrusel from "../img/carrusel.jpg"; // Reemplaza "terapia.jpg" con la ruta de tu imagen de portada
import carrusel2 from "../img/carrusel 2.jpg";
import carrusel3 from "../img/carrusel 3.jpg";
import carrusel4 from "../img/carrusel 4.jpg";
import image from "../img/taller.jpg"
import image2 from "../img/reflex.jpg"
import { RxDot } from "react-icons/rx";
const Home = () => {
  const slides = [
    {
      url: `${carrusel}`,
    },
    {
      url: `${carrusel2}`,
    },
    {
      url: `${carrusel3}`,
    },
    {
      url: `${carrusel4}`,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambio cada 5 segundos

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (

    <div className="">

      <div className=" w-full h-[400px] md:h-[550px]  overflow-hidden relative">
        {slides.map((slide, slideIndex) => (
          <img
            key={slideIndex}
            src={slide.url}
            alt={`Slide ${slideIndex}`}
            className={` w-full h-[370px] md:h-full absolute top-0 left-0 transition-opacity duration-1000 opacity-0  ${slideIndex === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>
      <div className=" flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            id="productos"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-1xl cursor-pointer ${slideIndex === currentIndex ? "text-black" : "text-gray-400"
              }`}
          >
            <RxDot />
          </div>
        ))}
      </div>





      <div className="relative flex justify-center mt-0 md:h-[800px]">
       

        <div className="relative md:mt-32 ">
          <video
            src="https://firebasestorage.googleapis.com/v0/b/terapiasholisticasdmc.appspot.com/o/presentacion.mp4?alt=media&token=0d03c244-3fc0-4f92-9cfe-ed7693048e28"
            autoPlay
            controls
            className="w-[900px] rounded-xl "
          />
        </div>
      </div>
      <div className="text-center mt-10" style={{ 
    backgroundImage: `url(${image2})`,
    backgroundSize: 'cover',
   
  }}>

  <div className="bg-white bg-opacity-50"> {/* Agrega este div para que el contenido sea legible */}
    <h1 className="text-5xl text-blue-950 font-family mb-1">
      Nuestros cursos en linea!
    </h1>
    <div className="flex flex-col sm:flex-row justify-center items-center mt-4" >
      <CardCoursesMas />
    </div>
  </div>
</div>
    </div>
  );
};

export default Home;
