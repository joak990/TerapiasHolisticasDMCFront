import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendpayament } from "../Redux/Actions"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
initMercadoPago('TEST-e0a79806-12bb-45f7-9dc4-5e2e46bed1f1');

const ModalCarrito = ({ isOpen, onClose }) => {
  // Recuperar los datos del carrito del localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const emailshop = localStorage.getItem("email")
const [prefenceid,setPreferenceId] = useState(null)
  const dispatch = useDispatch()
  const [currentCart, setCurrentCart] = useState(cartItems);
  const idshop = []
  cartItems.map((e) => {

    idshop.push(e.id)
  })
  console.log(prefenceid,'prefendeID');
  const total = currentCart.reduce((acc, item) => acc + item.precio, 0);
  const removeItemFromCart = (index) => {
    // Crea una copia del carrito actual
    const updatedCart = [...currentCart];

    updatedCart.splice(index, 1);
    // Actualiza el estado local y el localStorage
    setCurrentCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload()

  };

  const createpreference =  async() =>{
try {
  const response = await axios.post("http://localhost:3001/create_preference",{
    title:"title",
    price:total,
    quantity:1,
  })
const  {id } = response.data
return id

} catch (error) {
  console.log(TypeError);
}
  }

  const handlebuy =  async()=>{
    const id = await createpreference()
    if(id) {
      setPreferenceId(id)
    }
  }

  const removecart = () => {
    // Vaciar todo el carrito
    localStorage.removeItem("cart");

    setCurrentCart([]);
  };


  const datashop = {
    id: idshop,
    email: emailshop,
  }


  const handlesendpayment = () => {
    console.log("cli");
    dispatch(sendpayament(datashop))
    localStorage.removeItem("cart");

  }
  return (
    <div className={`modal mt-44 md:mt-44 ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card  w-[260px] md:w-[600px]  mx-auto">
        <div className="flex justify-center">
          <h1 className="text-4xl md:mb-0 mb-8 font-custom text-center">Tu Compra</h1>
        </div>
        <section className="modal-card-body  p-4">
          <ul>
            {currentCart.map((item, index) => (
              <li key={index} className="md:mb-6  mb-10">
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
          <button className="font-custom text-lg md:text-2xl" onClick={removecart}>
            Vaciar carrito
          </button>
        </div>
        <footer className="modal-card-foot flex justify-center ">


          <button
            onClick={handlebuy}
            className="button text-center bg-blue-400 h-9 w-72 text-white rounded-lg is-primary ml-2 font-custom"

          >
            Pagar con Mercado Pago
          </button>
          {prefenceid && <Wallet initialization={{prefenceid}} />}
        </footer>
      </div>
    </div>
  );
};

export default ModalCarrito;
