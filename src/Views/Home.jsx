import CardCourses from "../Components/CardCourses";
import CardMuestras from "../Components/CardMuestras";
import CoverImage from "../img/terapia.jpg"; // Reemplaza "terapia.jpg" con la ruta de tu imagen de portada

const Home = () => {
  return (
    <div>
      <div
        className="h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${CoverImage})` }}
      >
        <div className="flex flex-col justify-center items-center h-full">
        
        </div>
      </div>
      <div className="text-center mt-10">
      <h1 className="text-5xl  text-custom  mb-1">Nuestros cursos on demand</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
          <CardCourses className="mt-4" />
          <CardCourses className="mt-4" />
          <CardCourses className="mt-4" />
        </div>
        <div className="text-center mt-10">
        <h1 className="text-5xl font-serif   text-custom  mb-4">Conoce mas sobre nosotros</h1>
        <div className="flex flex-col  mt-44 sm:flex-row  gap-10 justify-center items-center">
          <CardMuestras className="mt-10"/>
          <CardMuestras className="mt-2" />
          <CardMuestras className="mt-2"/>
        </div>
       
      </div>
    </div>
    </div>
  );
}

export default Home;
