
import CardCourses from "../Components/CardCourses";
import CardCoursesMas from "../Components/CardCoursesMas";
import CardBooks from "../Components/CardBooks";
function Courses() {
  


  return (
    <div className="flex flex-col items-center ">
      
      <div className="text-4xl font-custom  mb-4 text-azullog">Explora Nuestros Cursos</div>
      <div className="mt-2">
        <h1  className="text-5xl mt-14  text-blue-950 font-extralight font-montserrat_alternates">Nuestros Cursos</h1>
      </div>
      <div>
      <CardCourses className="flex justify-center" />
      </div>
      <div className="flex justify-center">
        <h1  className="text-5xl text-center  items-center  mt-14  text-blue-950 font-extralight font-montserrat_alternates">Nuestros Libros</h1>
        </div>
      <div className="flex justify-center gap-8">
        
      
     <CardBooks/>
      </div>
     
      <div className="text-4xl mt-24  text-blue-950 font-extralight font-montserrat_alternates">¿Por qué elegirnos?</div>
      <div className="mt-24 bg-gray-200  shadow-xl font-bold p-4 rounded-lg text-center text-2xl text-gray-700">
        Descubre las razones para elegir nuestra plataforma:
        <ul className="text-2xl text-gray-700 my-4 space-y-4">
          <li className="font-bold font-custom text-custom">Amplio catálogo de cursos.</li>
          <li className="font-bold font-custom text-custom">Acceso las 24/7 para adaptarse a tu horario.</li>
          <li className="font-bold font-custom text-custom">Contenido de alta calidad.</li>
        </ul>
       
      </div>
     
      <div className=" text-4xl mt-24 text-blue-950 font-extralight font-montserrat_alternates">
          ¿Como comprar un curso online?
        </div>
        <div className="relative md:mt-32 ">
          <video
            src="https://firebasestorage.googleapis.com/v0/b/terapiasholisticasdmc.appspot.com/o/tutoterapia.mp4?alt=media&token=db2818ca-42ac-4518-874b-7d2ed67cfa9a"
            
            controls
            className="w-[900px] rounded-xl "
          />
        </div>
    </div>
  );
}

export default Courses;
