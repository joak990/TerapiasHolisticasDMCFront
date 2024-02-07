import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendpayament } from "../Redux/Actions"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Loading from "./Loading";
import { FaTrashAlt } from "react-icons/fa";

initMercadoPago('TEST-3ed998e7-fcad-4a71-a939-d9241b087494');

const ModalCarrito = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const emailshop = localStorage.getItem("email")
  const [preferenceId, setPreferenceId] = useState(null)
  const [currentCart, setCurrentCart] = useState(cartItems);
  const [isLoading, setIsLoading] = useState(true);
  const idshop = []
  cartItems.map((e) => {
    idshop.push(e.id)
  })
  const itemNames = cartItems.map((item) => item.nombre).join(', ');

  console.log(itemNames, "carritonamessss");
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


  const createpreference = async () => {
    try {
      const response = await axios.post("https://terapias-holisticas-dmc-back.vercel.app/mercado_pago",

        {
          title: itemNames,
          quantity: 1,
          price: total
        }

      )

      const { id } = response.data;
      console.log(response);
      return id;

    } catch (error) {
      console.log(error);
    }
  }


  const removecart = () => {
    // Vaciar todo el carrito
    localStorage.removeItem("cart");
    window.location.reload()
    setCurrentCart([]);
  };


  const datashop = {
    id: idshop,
    email: emailshop,
  }




  useEffect(() => {
    localStorage.setItem("orderdata", JSON.stringify(datashop));
    const fetchData = async () => {
      try {
        const id = await createpreference();
        setPreferenceId(id);
        setIsLoading(false); // Una vez que la preferencia está lista, establecemos isLoading en falso
      } catch (error) {
        console.error(error);
        setIsLoading(false); // En caso de error, también establecemos isLoading en falso
      }
    };

    fetchData();
  }, []);


  const handlesave = () => {
    console.log("se apretó el botón de MercadoPago");

    // Guardar datashop en localStorage
    localStorage.setItem("order", JSON.stringify(datashop));

    // Asegurarse de que el pedido se haya guardado correctamente
    const orderData = localStorage.getItem("order");
    if (orderData) {
      console.log("La información del pedido se ha guardado en el localStorage:", orderData);
    } else {
      console.error("Hubo un problema al guardar la información del pedido en el localStorage.");
    }
  }

  return (
    <div className={`modal mt-44 md:mt-44 ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card w-[80%] md:w-[70%] lg:w-[50%] mx-auto">
        <div className="flex justify-center">
          <h1 className="text-4xl md:mb-8 mb-8 font-custom text-center">Tu Compra</h1>
        </div>
        <section className="modal-card-body p-4 rounded-lg shadow-2xl w-[330px]  shadow-black md:w-[700px]" >
          {currentCart.map((item, index) => (
            <div key={index} className="md:mb-8 mb-10  mt-4 h-[200px]" >
              <div className=" flex flex-col md:flex-row items-center justify-between h-[100px]">
                <div className="flex items-center">
                  <img
                    src={item.imagen}
                    alt={item.imagen}
                    className="w-24 h-24 rounded-lg mr-4"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-black">{item.nombre}</div>
                    <div className="mt-2">Cantidad:  1</div>
                    <div>
                      <button
                        onClick={() => removeItemFromCart(index)}
                        className=" text-white mt-2 font-custom shadow-lg rounded-lg bg-red-400 shadow-gray-400 m-0 p-1 cursor-pointer hover:scale-110 ease-in duration-200 hover:bg-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-right md:text-right mt-10 md:mt-0">
                <div className="text-gray-600">Precio: ${item.precio.toFixed(2)}</div>
              </div>
              <hr className="my-4 border-t border-gray-400" />
            </div>
          ))}
        <div className="text-gray-600 flex justify-end font-bold text-xl my-4 mt-12">
          Total: ${total.toFixed(2)}
        </div>
        {isLoading ? (
            <Loading /> // Mostrar el componente de carga mientras isLoading es true
          ) : (
            // Mostrar el botón de MercadoPago una vez que isLoading es false
            preferenceId && <Wallet initialization={{ preferenceId }} />
          )}
        <div className="flex justify-start font-custom text-2xl items-start">
          <button className="font-custom text-sm md:text-base rounded-md shadow-lg bg-gray-300 shadow-gray-400 m-3 p-2 cursor-pointer hover:scale-110 ease-in duration-200 " onClick={removecart}>
            Vaciar carrito
          </button>
        </div>
        </section>

        {/* <hr className="my-4 border-t border-gray-400" /> */}
        <footer className="modal-card-foot flex justify-center mt-6">
         
        </footer>
      </div>
    </div>
  );

};


export default ModalCarrito;
