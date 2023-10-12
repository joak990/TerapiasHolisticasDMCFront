
import { Link } from "react-router-dom";
import image from "../img/registros.jpg"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmycourses, getallmycourses } from "../Redux/Actions";
import Loading from "../Components/Loading";

function MyCourses() {

  const mycourses = useSelector(state => state.mycourses);
  

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true); 
  // Filtrar los cursos comprados
 

  useEffect(() => {
    const storedemail = localStorage.getItem("email")
    dispatch(getallmycourses(storedemail))
    .then(() => {
      // Una vez que el dispatch se ha completado, establece isLoading en false
      setIsLoading(false);
    });

  // Simula una carga de 3 segundos incluso si el dispatch es rápido
  const loadingTimeout = setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  // Limpia el timeout en caso de que el dispatch tarde menos de 3 segundos
  return () => clearTimeout(loadingTimeout);
}, [dispatch]);

  const handlegetmyvideos = (id) => {
    console.log(id, 'id del component My courses');
    dispatch(getmycourses(id));
  }
  return (
    <div className="mt-44 mx-auto max-w-screen-lg">
      <h1 className="text-4xl text-custom text-center">MIS CURSOS</h1>
      {isLoading ? (
        <Loading /> // Mostrar el componente de carga mientras isLoading es true
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {mycourses?.map((course) => (
          <div key={course?.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={course?.imagen} alt={course?.nombre} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{course?.nombre}</h2>
              <p className="text-gray-500 mt-2">{course?.descripcion}</p>
              <Link to={`/playcourse/${course.id}`}>
                <button onClick={() => handlegetmyvideos(course.id)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                  Ver Curso
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      )}
      <p className="mt-8 text-center text-gray-600">
        ¿Quieres comprar más cursos? <a href="/">Haz clic aquí</a>.

      </p>
    </div>
  );
}

export default MyCourses;
