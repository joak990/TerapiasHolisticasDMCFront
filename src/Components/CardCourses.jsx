import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { addToCart, getallcourses } from "../Redux/Actions";
import { useEffect } from "react";

function CardCourses() {
  const courses = useSelector(state => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(getallcourses())
  }, []);

  const handleBuyClick = (course) => {
    const accountVerified = localStorage.getItem('name');
    
    if (!accountVerified) {
      Swal.fire({
        title: 'Necesitas iniciar sesión',
        text: 'Para comprar este curso, debes iniciar sesión.',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Iniciar Sesión',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir al usuario a la página de inicio de sesión
          window.location.href = '/login'; // Cambia '/login' por la URL de tu página de inicio de sesión
        }
      });
      return;
    }

  
    dispatch(addToCart({ course }));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(course);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {courses.map((course) => (
        <div key={course.id} className="max-w-xs bg-white shadow-xl rounded-lg overflow-hidden">
          <img src={course.imagen} alt={course.nombre} className="w-full h-auto" />
          <div className="p-4">
            <h2 className="text-xl font-custom font-semibold mb-2">{course.nombre}</h2>
            <p className="text-gray-700 font-custom">{course.descripcion}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="font-custom text-gray-500 text-lg">Precio: ${course.precio}</p>
              <button onClick={() => handleBuyClick(course)} className="font-bold bg-bgla hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardCourses;
