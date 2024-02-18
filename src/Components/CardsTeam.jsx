import { useState } from 'react';

import joacoloogo from "../img/joacologo.jpg";
import emilogo from "../img/emilogo.jpg";
import marilogo from "../img/marilogo.jpg";
import patricklogo from "../img/patricklogo.jpg";

function Cardsteam() {
  const images = [
    { id: 1, src: joacoloogo, title: "Joaquin Haidar", description: "Sofware Developer" },
    { id: 2, src: emilogo, title: "Emilia Reyes", description: "Estratega de marca y negocio. " },
    { id: 3, src: marilogo, title: "Maria Leiseca", description: "Community Manager" },
    { id: 4, src: patricklogo, title: "Patrick Murayari", description: "Sofware Developer" }
  ];

  // Estado para almacenar el ID de la tarjeta sobre la cual se pasa el cursor
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div>
      <div className="md:flex gap-8">
        {images.map((image) => (
          <div
            key={image.id}
            className={`w-[300px] mt-28 bg-white shadow-xl h-84  shadow-blue-400 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-2 ${hoveredId === image.id ? 'hover:scale-105' : ''}`} // Aplica la clase 'hovered' si el ID coincide
            onMouseEnter={() => setHoveredId(image.id)} // Actualiza el estado al pasar el cursor sobre la tarjeta
            onMouseLeave={() => setHoveredId(null)} // Restablece el estado al retirar el cursor de la tarjeta
          >
              <h2 className="text-xl font-custom font-montserrat_alternates text-center font-semibold mb-2">{image.title}</h2>
              <p className="text-blue-950 text-center font-extralight font-montserrat_alternates font-custom">{image.description}</p>
            <img src={image.src} alt={`Imagen ${image.id}`} className="w-full h-[500px] " />
          
            <div className="p-4">
           
              <div className="flex justify-between items-center mt-4">
             
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cardsteam;
