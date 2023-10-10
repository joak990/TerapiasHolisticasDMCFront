
import { Link } from "react-router-dom";
import image from "../img/registros.jpg"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmycourses, getallmycourses } from "../Redux/Actions";

function MyCourses() {

  const mycourses = useSelector(state => state.mycourses);
  const courses = [
    {
      id: 1,
      name: 'Registros Akashicos',
      description: 'Los registros akashicos prometen ser la salvacion',
      image: image,
      Purchased: true
    },
    {
      id: 2,
      name: 'Testeo de Memoria Celular',
      description: 'testeo muscular se presicion.',
      image: image,
      Purchased: true,
    },
    // Agrega más cursos aquí
  ];

  const dispatch = useDispatch()

  // Filtrar los cursos comprados
  const purchasedCourses = courses.filter((course) => course.Purchased);

  useEffect(() => {
    const storedemail = localStorage.getItem("email")
    dispatch(getallmycourses(storedemail))
    // Actualiza el carrito en el localStorage
  }, []);

  const handlegetmyvideos = (id) => {
    console.log(id, 'id del component My courses');
    dispatch(getmycourses(id));
  }
  return (
    <div className="mt-44 mx-auto max-w-screen-lg">
      <h1 className="text-4xl text-custom text-center">MIS CURSOS</h1>
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
      <p className="mt-8 text-center text-gray-600">
        ¿Quieres comprar más cursos? <a href="/">Haz clic aquí</a>.

      </p>
    </div>
  );
}

export default MyCourses;
