import { getAuth, signOut } from "firebase/auth";
import logo from "../Logocuadrado.jpg";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebaseconfig";
import { CiShoppingCart } from 'react-icons/ci';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOptionsOpen, setOptionsOpen] = useState(false); // Estado para controlar la visibilidad de las opciones
  const firebaseAuth = getAuth(app);
  const storedFotoURL = localStorage.getItem("fotoURL");
  const user = firebaseAuth?.currentUser;
  const displayName = localStorage.getItem('name');
  const fotoURL = user?.photoURL
  if (fotoURL) {
    localStorage.setItem("fotoURL", fotoURL);
  }
  
  const cart = useSelector(state => state.cart);
  const handleLogout = async () => {
    
    await signOut(firebaseAuth);
    localStorage.removeItem('id');
    localStorage.removeItem('fotoURL');
    localStorage.removeItem('PHOTO');
    localStorage.removeItem('newphoto');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem("cart");
   
    navigate("/");
  };

  // Función para alternar la visibilidad de las opciones al hacer clic en la foto
  const toggleOptions = () => {
    setOptionsOpen(!isOptionsOpen);
  };


  useEffect(() => {
    updateCartCount(); 
    // Actualiza el carrito en el localStorage

  }, [dispatch]);

  const [cartCount, setCartCount] = useState(0); // Estado para mantener la cantidad de productos en el carrito

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cartItems.length;
    setCartCount(itemCount);
    console.log(cart,"ute ");

  };

  return (<div>


    <nav className="bg-custom p-8 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center"> {/* Contenedor del logo y el texto */}
            <Link to="/">
              <img src={logo} alt="Logo" className="w-14 h-14 rounded-full mr-2" /> {/* Cambia la ruta al logotipo */}
            </Link>
            <div className="text-white  md:m-0 ml-4 font-custom font-extralight text-2xl md:text-3xl">Terapias Holísticas DMC</div>
          </div>
          <div className="md:flex md:items-center md:space-x-24 mt-4 md:mt-0">
            <ul className="md:flex md:space-x-8 text-white md:text-lg">
              <li>
                <a href="/" className="hover:text-blue-800 font-custom text-2xl">Inicio</a>
              </li>
              <li>
                <a href="/courses" className="hover:text-blue-800 font-custom text-2xl">Cursos</a>
              </li>
              <li>
                <a href="/me" className="hover:text-blue-800 font-custom text-2xl">Sobre mi</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-800 font-custom text-2xl">Contacto</a>
              </li>
              {displayName ? (
                // Mostrar "Mis Cursos" si hay un displayName en localStorage
                <li>
                  <a href="/mycourses" className="hover:text-blue-800 font-custom text-2xl">Mis Cursos</a>
                </li>
              ) : null}
              {!displayName ? (
                // Mostrar "Iniciar Sesión" solo si no hay displayName en localStorage
                <li>
                  <a href="/login" className="hover:text-blue-800 font-custom text-2xl">Iniciar Sesión</a>
                </li>
              ) : null}
              
            </ul>
            <div className=" md:mt-0  mt-4 flex items-center relative"> 
            <div>
            
              <img src={storedFotoURL} onClick={toggleOptions} className="cursor-pointer h-9 w-9 rounded-full"/>
              {cart.length > 0 && ( // Mostrar notificación si el carrito no está vacío
                    <div className="bg-red-500  text-white text-xs w-5 h-5 rounded-full absolute top-0 right-4 md:right-0 -mt-1 -mr-1 flex items-center justify-center">
                      {cart.length }
                    </div>
                  )}
            </div>
              <div > 
                <Link to="/myshop">
                  { displayName ? (<CiShoppingCart  className="text-4xl" alt="Foto de perfil" />) :null
                  
                }
                </Link>
              </div>
             
              {isOptionsOpen && ( // Mostrar las opciones si isOptionsOpen es true
                <div className="absolute right-0 top-10 bg-white w-32 p-2 rounded shadow-md">
                  <ul>
                    <li>
                      <a href="/profile" className="hover:text-blue-800 font-custom text-xl block">Mi Perfil</a>
                    </li>
                    <li>
                      <a href="/mycourses" className="hover:text-blue-800 font-custom text-xl block">Mis Cursos</a>
                    </li>
                    <li>
                      <a href="/" onClick={handleLogout} className="hover:text-blue-800 font-custom text-xl block">Cerrar Sesión</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          
          </div>
        </div>
      </div>
    </nav>
    
     </div>
  );
}

export default Navbar;
