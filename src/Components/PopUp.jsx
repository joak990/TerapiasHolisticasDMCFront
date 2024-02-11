import React, { useState, useEffect } from 'react';

const Popup = ({ onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000); // Mostrar el pop-up cada 30 segundos

    return () => clearTimeout(timer);
  }, [show]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    show && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-600" onClick={handleClose}>×</button>
          <h2 className="text-xl font-bold mb-4">¿Te está gustando nuestra página web?</h2>
          <p className="text-sm mb-4">Suscríbete a nuestro newsletter para recibir las últimas actualizaciones.</p>
          <form>
            <input type="email" className="border border-gray-300 rounded px-4 py-2 w-full mb-4" placeholder="Tu correo electrónico" required />
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600">Suscribirse</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Popup;
