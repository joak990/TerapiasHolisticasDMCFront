import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendpayament } from "../Redux/Actions"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";


initMercadoPago('TEST-3ed998e7-fcad-4a71-a939-d9241b087494');

const ModalCarrito = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  // Recuperar los datos del carrito del localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const emailshop = localStorage.getItem("email")
  const [preferenceId, setPreferenceId] = useState(null)
  const [currentCart, setCurrentCart] = useState(cartItems);
  const idshop = []
  cartItems.map((e) => {
    idshop.push(e.id)
  })
  const itemNames = cartItems.map((item) => item.nombre).join(', ');
  
  console.log(itemNames,"carritonamessss");
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
      const response = await axios.post("http://localhost:3001/mercado_pago", 
      {
        title: itemNames,
        quantity:1,
        price: total
      }
      )
      
      const { id } = response.data;
      console.log('id--->',id);
      return id;
      
    } catch (error) {
      console.log(error);
    }
  }
  
  // const handlebuy = async () => {
  //   const id = await createpreference()
  //   if(id) {
  //     setPreferenceId(id)
  //   }
  //   // console.log('----preferenceid---',prefenceId);
  // }
  
  

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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await createpreference();
        setPreferenceId(id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
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
          {/* <button
            onClick={handlebuy}
          >
            pagar con mercadopago
          </button> */}

          {preferenceId && <Wallet initialization={{preferenceId}} />}
        </footer>
      </div>
    </div>
  );
};


export default ModalCarrito;
