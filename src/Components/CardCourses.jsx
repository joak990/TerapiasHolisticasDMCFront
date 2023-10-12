import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { addToCart, getallcourses } from "../Redux/Actions";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function CardCourses() {
  const courses = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getallcourses()).then(() => {
      setIsLoading(false); // Cuando los cursos se cargan, establecemos isLoading en falso
    });
  }, [dispatch]);

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
  
    // Verificar si el curso ya está en el carrito
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const courseAlreadyInCart = cart.some((cartItem) => cartItem.id === course.id);
  
    if (courseAlreadyInCart) {
      // Si el curso ya está en el carrito, mostrar un mensaje de error
      Swal.fire({
        title: 'No puedes volver a agregar este curso',
        text: 'Este curso ya se encuentra en tu carrito de compras.',
        icon: 'error',
      });
    } else {
      // Si el curso no está en el carrito, agregarlo
      dispatch(addToCart({ course }));
      cart.push(course);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <div>
    {isLoading ? (
      <Loading /> // Mostrar el componente de carga mientras isLoading es true
    ) : (
      // Cuando isLoading es falso, mostrar la lista de cursos
      <div className="md:flex   gap-32  ">
        {courses.map((course) => (
        <div key={course.id} className="max-w-xs mt-28 bg-white shadow-xl  shadow-blue-200 rounded-lg overflow-hidden">
          <img src={course.imagen} alt={course.nombre} className="w-full h-auto" />
          <div className="p-4">
            <h2 className="text-xl font-custom font-semibold mb-2">{course.nombre}</h2>
            <p className="text-gray-700 font-custom">{course.descripcion}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="font-custom text-gray-500 text-lg"> ${course.precio}</p>
              <button onClick={() => handleBuyClick(course)} className="font-bold bg-bgla hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    )}
    </div>
  );
}

export default CardCourses;
