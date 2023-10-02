import registros from "../img/registros.jpg"

function CardCourses() {
  return (
    <div className="max-w-xs mx-auto mt-32 bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={registros} alt="Nombre del Curso" className="w-full h-auto" />
      <div className="p-4">
        <h2 className="text-xl font-custom font-semibold mb-2">Registros Akashicos</h2>
        <p className="text-gray-700 font-custom">
          Los registros akáshicos son los archivos de las memorias del alma. No es un espacio físico de esta dimensión, sino energético, sin medidas de tiempo.
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="font-custom text-gray-500 text-lg">Precio: $99.99</p>
          <button className="font-custom bg-custom hover:bg-green-200 text-white font-bold py-2 px-4 rounded-full">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCourses;
