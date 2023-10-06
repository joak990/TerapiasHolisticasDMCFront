import { useDispatch } from "react-redux";
import registros from "../img/registros.jpg"
import { addToCart } from "../Redux/Actions";
import Swal from 'sweetalert2';
function CardCourses() {
  
  const dispatch = useDispatch();

  const handleBuyClick = () => {
    const accountverified = localStorage.getItem('name');
    if (!accountverified) {
      Swal.fire({
        title: 'Necesitas iniciar sesión',
        text: 'Para comprar este curso, debes iniciar sesión.',
        icon: 'error',
        showCancelButton: true, // Muestra un botón de cancelar
        confirmButtonText: 'Iniciar Sesión', // Texto del botón de confirmación
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes redirigir al usuario a la página de inicio de sesión
          window.location.href = '/login'; // Cambia '/login' por la URL de tu página de inicio de sesión
        }
      });
      return; // Evita agregar el producto al carrito si no ha iniciado sesión
    }
  
    // Resto del código para agregar el producto al carrito
    const product = {
      id: 1,
      name: "Registros Akashicos",
      price: 99.99,
      image: registros,
    };
    dispatch(addToCart({ product }));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  

  return (
    
    <div className="max-w-xs mx-auto mt-32 bg-white shadow-xl  rounded-lg overflow-hidden">
      <img src={registros} alt="Nombre del Curso" className="w-full h-auto" />
      <div className="p-4">
        <h2 className="text-xl font-custom font-semibold mb-2">Registros Akashicos</h2>
        <p className="text-gray-700 font-custom">
          Los registros akáshicos son los archivos de las memorias del alma. No es un espacio físico de esta dimensión, sino energético, sin medidas de tiempo.
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="font-custom text-gray-500 text-lg">Precio: $99.99</p>

          <button onClick={handleBuyClick} className="font-bold bg-bgla hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCourses;
