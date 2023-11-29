import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { addToCart, getallbooks } from "../Redux/Actions";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function CardBooks() {
    const books = useSelector(state => state.books);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getallbooks()).then(() => {
            setIsLoading(false); // Cuando los cursos se cargan, establece
    })}, [dispatch])

    const handleBuyClick = (book) => {
        const accountVerified = localStorage.getItem('name');

        if (!accountVerified) {
            Swal.fire({
                title: 'Necesitas iniciar sesión',
                text: 'Para comprar este libro, debes iniciar sesión.',
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


        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const bookAlreadyInCart = cart.some((cartItem) => cartItem.id === book.id);

        if (bookAlreadyInCart) {
            // Si el curso ya está en el carrito, mostrar un mensaje de error
            Swal.fire({
                title: 'No puedes volver a agregar este curso',
                text: 'Este curso ya se encuentra en tu carrito de compras.',
                icon: 'error',
            });
        } else {
            // Si el curso no está en el carrito, agregarlo
            dispatch(addToCart({ book }));
            cart.push(book);
            Swal.fire({
                title: 'Producto agregado al carrito!',
                text: '¿Deseas seguir comprando o ir al carrito?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Ir al carrito',
                cancelButtonText: 'Seguir comprando',
                customClass: {
                    confirmButton: 'bg-blue-200 text-white', // Clase para el botón "Ir al carrito"
                    cancelButton: 'bg-gray-200 text-white'  // Clase para el botón "Seguir comprando"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirige a /myshop
                    window.location.href = '/myshop';
                } else {
                    // Continúa comprando
                    // Puedes agregar aquí la lógica para seguir comprando
                }
            });

            localStorage.setItem("cart", JSON.stringify(cart));
        }
    };

    return (
        <div>
            {isLoading ? (
                <Loading /> // Mostrar el componente de carga mientras isLoading es true
            ) : (
                // Cuando isLoading es falso, mostrar la lista de cursos
                <div className="md:flex gap-8">
                    {books.map((book) => (
                        <div key={book.id} className="w-[300px] mt-28 bg-white shadow-xl h-84  shadow-blue-400 rounded-lg overflow-hidden">
                            <img src={book.imagen} alt={book.nombre} className="w-full h-[200px] " />
                            <div className="p-4">
                                <h2 className="text-xl font-custom font-semibold mb-2">{book.nombre}</h2>
                                <p className="text-gray-700 font-custom">{book.descripcion}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="font-custom text-gray-900  text-xl"> ${book.precio}</p>
                                    <button onClick={() => handleBuyClick(book)} className="font-bold bg-bgla hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
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

export default CardBooks;
