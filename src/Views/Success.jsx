import { Link } from 'react-router-dom';
import logogira from '../img/logosinfondo.png'
import { sendmailnoti, sendpayament , sendpayamentbooks } from '../Redux/Actions';
import { useDispatch } from 'react-redux';
function Success() {

  const currentURL = window.location.href;
  const email = localStorage.getItem('email')
  const cart = localStorage.getItem('cart');
// Analiza los parámetros de la URL
const urlParams = new URLSearchParams(currentURL);
const dispatch = useDispatch()
const status = urlParams.get('status');
const cartbuy = JSON.parse(cart)


const libros = cartbuy.filter(item => "link" in item);
const cursos = cartbuy.filter(item => !("link" in item));

// Imprimir los resultados
console.log("Cursos:");
console.log(cursos);

console.log("\nLibros:");
console.log(libros);


const idLibros = []
 libros.map((e) => {
  idLibros.push(e.id)
})

const idCursos = []
 cursos.map((e) => {
  idCursos.push(e.id)
})

console.log('idLibrios' , idLibros);

const DataLibros = {
  id: idLibros,
  email: email,
}

const DataCursos = {
  id: idCursos,
  email: email,
}

console.log(DataCursos ,'DataCursos');
console.log(DataLibros ,'DataLibros');


  if(cursos || libros){
    {
      dispatch(sendpayament(DataCursos))
      dispatch(sendmailnoti(email))
      dispatch(sendpayamentbooks(DataLibros))
      localStorage.removeItem("orderdata")
      localStorage.removeItem("cart")
    }
  }
  

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="mt-8">
        <img src={logogira} alt="imagen" className="w-44 h-44 animate-spin-slow" />
      </div>
      <div className="text-3xl font-bold text-green-600 text-center">
        ¡Gracias por realizar tu compra!
      </div>
      <div className="mt-8">
        <Link to="/" className="bg-bgla hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ir al Inicio
        </Link>
      </div>
      
    </div>
  );
}

export default Success;