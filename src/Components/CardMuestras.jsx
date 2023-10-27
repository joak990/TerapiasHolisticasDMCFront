import React, { useState } from "react";
import registros from "../img/registros.jpg";

function CardMuestras() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`max-w-sm mx-auto bg-blue-100 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="">
        <h2 className="text-xl text-custom font-semibold mb-2">Terapias</h2>
      </div>
      <div className="border-8 border-purple-200">
        <img
          src={registros}
          alt="Terapias"
          className="w-full h-72 object-cover"
        />
      </div>
    </div>
  );
}

export default CardMuestras;
