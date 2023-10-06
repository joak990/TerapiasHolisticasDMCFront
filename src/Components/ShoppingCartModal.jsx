import React, { useState } from "react";

const ModalCarrito = ({ isOpen, onClose }) => {
  // Recuperar los datos del carrito del localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Estado local para mantener la orden actual
  const [currentCart, setCurrentCart] = useState(cartItems);
  const total = currentCart.reduce((acc, item) => acc + item.price, 0);
  const removeItemFromCart = (index) => {
    // Crea una copia del carrito actual
    const updatedCart = [...currentCart];
    // Elimina el artículo específico
    updatedCart.splice(index, 1);
    // Actualiza el estado local y el localStorage
    setCurrentCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removecart = () => {
    // Vaciar todo el carrito
    localStorage.removeItem("cart");
    setCurrentCart([]);
  };

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
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mr-4"
                  />
                  <div>
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-gray-600">Precio: ${item.price}</div>
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
       
       <button className="button bg-red-300 w-20 is-success rounded-lg font-custom " onClick={onClose}>Cerrar</button>
       <button className="button  bg-green-200 w-20  rounded-lg is-primary ml-2 font-custom" onClick={onClose}>Pagar</button>
     </footer>
      </div>
    </div>
  );
};

export default ModalCarrito;
