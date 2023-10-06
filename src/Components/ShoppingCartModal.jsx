import  { useState } from "react";
import { useDispatch } from "react-redux";
import {removeFromCart, sendpayament} from "../Redux/Actions"


const ModalCarrito = ({ isOpen, onClose }) => {
  // Recuperar los datos del carrito del localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const emailshop = localStorage.getItem("email")
const nameshop = localStorage.getItem("name")
const dispatch = useDispatch()
  const [currentCart, setCurrentCart] = useState(cartItems);
  const total = currentCart.reduce((acc, item) => acc + item.precio, 0);
  const removeItemFromCart = (index) => {
    // Crea una copia del carrito actual
    const updatedCart = [...currentCart];
   const removedItemId = updatedCart[index].id;
    updatedCart.splice(index, 1);
    // Actualiza el estado local y el localStorage
    setCurrentCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
window.location.reload()
  
  };
  
  const removecart = () => {
    // Vaciar todo el carrito
    localStorage.removeItem("cart");

    setCurrentCart([]);
  };

  const datashop = {
    id: currentCart,
    email:emailshop,
    nombre: nameshop
  }

  const handlesendpayment = ()=>{
    dispatch(sendpayament(datashop))
  }


  return (
    <div className={`modal md:mt-44 ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card w-[600px]  mx-auto">
     <div className="flex justify-center">
      <h1 className="text-4xl font-custom text-center">Tu Compra</h1>
     </div>
        <section className="modal-card-body p-4">
          <ul>
            {currentCart.map((item, index) => (
              <li key={index} className="mb-6">
                <div className="flex items-center h-[100px]">
                  <img
                    src={item.imagen}
                    alt={item.imagen}
                    className="w-24 h-24 rounded-lg mr-4"
                  />
                  <div>
                    <div className="font-bold text-black">{item.nombre}</div>
                    <div className="text-gray-600">Precio: ${item.precio}</div>
                    <div className="text-center mt-2">Cantidad: 1</div>
                    <div>
                      <button
                        onClick={() => removeItemFromCart(index)}
                        className="text-red-500 font-custom"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div>
          <div className="text-gray-600 font-bold text-xl my-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
        <hr className="my-4 border-t border-gray-400" />
        <div className="flex justify-start font-custom text-2xl items-start">
          <button className="font-custom" onClick={removecart}>
            Vaciar carrito
          </button>
        </div>
        <footer className="modal-card-foot flex justify-center ">
       

        <div 
          onClick={handlesendpayment}
            className="button text-center bg-blue-400 h-9 w-72 text-white rounded-lg is-primary ml-2 font-custom"
          
          >
            Pagar con Mercado Pago
          </div>
     </footer>
      </div>
    </div>
  );
};

export default ModalCarrito;
