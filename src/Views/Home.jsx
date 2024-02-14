import { useEffect, useState, useCallback } from "react";
import CardCoursesMas from "../Components/CardCoursesMas";
import CardBooksMas from "../Components/CardBooksMas";
import carrusel from "../img/carrusel.jpg"; // Reemplaza "terapia.jpg" con la ruta de tu imagen de portada
import carrusel2 from "../img/carrusel 2.jpg";
import carrusel3 from "../img/carrusel 3.jpg";
import carrusel4 from "../img/carrusel 4.jpg";
import { RxDot } from "react-icons/rx";
import image2 from "../img/reflex.jpg";

const Home = () => {
  const slides = [
    { url: carrusel },
    { url: carrusel2 },
    { url: carrusel3 },
    { url: carrusel4 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambio cada 5 segundos

    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]);

  return (
    <div className="">
      <div className=" w-full h-[270px] md:h-[550px]  overflow-hidden relative">
        {slides.map((slide, slideIndex) => (
          <img
            key={slideIndex}
            src={slide.url}
            alt={`Slide ${slideIndex}`}
            className={` w-full h-[370px] md:h-full absolute top-0 left-0 transition-opacity duration-1000 opacity-0  ${
              slideIndex === currentIndex ? "opacity-100" : "opacity-0"
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
            className={`text-1xl cursor-pointer ${
              slideIndex === currentIndex ? "text-black" : "text-gray-400"
            }`}
          >
            <RxDot />
          </div>
        ))}
      </div>
      <div className="relative flex justify-center  md:h-[650px]">
        <div className="relative md:mt-32 ">
          <video
            src="https://firebasestorage.googleapis.com/v0/b/terapiasholisticasdmc.appspot.com/o/presentacion.mp4?alt=media&token=0d03c244-3fc0-4f92-9cfe-ed7693048e28"
            controls
            className="w-[900px] rounded-xl "
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white p-8 rounded-xl shadow-lg mt-0">
          <h1 className="text-3xl font-bold text-center mb-6">
            A partir del 2024, los cursos están siendo modificados
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Los cursos han sido actualizados para incluir los nuevos conceptos
            de la 6° dimensión y los cambios en los contenidos teóricos de las
            diversas disciplinas propiciados por los movimientos energéticos
            planetarios y universales que modifican, entre otras cosas, los
            tiempos y espacios disponibles para el aprendizaje de nuevos
            saberes.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Esta modalidad invita a una nueva responsabilidad, donde es
            necesario comprometerse a vivir desde los nuevos paradigmas de
            vida.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Por ello, se ha creado la Plataforma Virtual de Cursos de Terapias
            Holísticas DMC, que ofrece acceso a los contenidos TEÓRICOS
            ACTUALIZADOS de cada Disciplina.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            A partir del 2024, ingresando con un usuario a la plataforma,
            tendrás acceso al MÓDULO TEÓRICO de cada disciplina.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            La certificación se obtiene con la presencialidad a dichas clases
            y un trabajo práctico final, que NO están incluidos en el material
            teórico que te presentamos aquí.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Esta nueva Plataforma Virtual de Cursos de Terapias Holísticas DMC
            es accesible, sencilla y operativa. Con unos pocos clics ya estás
            en los cursos que elegiste.
          </p>
        </div>
        <p></p>
      </div>
    
                <h2 className="font-semibold  text-center">
               Para inscribirte a clases practicas y certificarte{" "}
                <a    href="https://wa.link/v2n4re"
            target="_blank"
            rel="noopener noreferrer" className="text-blue-700 cursor-pointer">click aqui</a>{" "}
              </h2>
      <div
        className="text-center mt-10"
        style={{
          backgroundImage: `url(${image2})`,
          backgroundSize: "cover",
        }}
      >
        <div className="bg-white bg-opacity-50">
          {" "}
          {/* Agrega este div para que el contenido sea legible */}
          <h1 className="text-5xl text-blue-950 font-extralight font-montserrat_alternates mb-1">
            Nuestros cursos
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center md:mt-4">
            <CardCoursesMas />
          </div>
          <div>
            <h1 className="text-5xl  mt-20 text-blue-950 font-extralight font-montserrat_alternates">
              Nuestros Libros
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center  mb-96">
              <CardBooksMas />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
