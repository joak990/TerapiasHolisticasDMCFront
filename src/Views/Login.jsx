import logo from "../assets/logocuadrado.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../firebaseconfig';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";

function Login() {
  const provider = new GoogleAuthProvider();
  const firebaseAuth = getAuth(app);
const navigate = useNavigate()
const handleLogin = async () => {
  try {
    await setPersistence(firebaseAuth, browserSessionPersistence);
    await signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // El inicio de sesión con Google fue exitoso, result contiene información del usuario
        console.log('Inicio de sesión exitoso:', result.user);
        localStorage.setItem('displayName', result.user.displayName);
        navigate("/"); // Redireccionar al usuario después del inicio de sesión
      })
      .catch((error) => {
        // Manejar errores si ocurren durante el inicio de sesión
        console.error('Error al iniciar sesión con Google:', error);
      });
  } catch (error) {
    console.error('Error al configurar la persistencia:', error);
  }
};


  return (
    <div className="flex">
      {/* Columna izquierda con fondo verde */}
      <div className="flex-1 bg-green-600 ">
        {/* Coloca aquí tu imagen */}
        <div className="flex justify-center items-center h-screen"> 
          <img
            src={logo}
            alt="Imagen"
            className="w-96 h-96 object-cover"
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex-1 bg-white p-8 flex items-center justify-center">
        <div className="w-96"> {/* Ancho máximo del formulario */}
          <h1 className="text-3xl font-semibold mb-4">Iniciar Sesión</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu correo electrónico"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu contraseña"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="mt-4">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
          <button
            onClick={handleLogin}
            className="mt-8 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 flex items-center"
          > 
           Iniciar sesión con Google
           <FcGoogle className="text-2xl ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

