
import image from "../img/registros.jpg"

function MyCourses() {
  // Supongamos que tienes una lista de cursos
  const courses = [
    {
      id: 1,
      name: 'Registros Akashicos',
      description: 'Los registros akashicos prometen ser la salvacion',
      image: image,
      Purchased: true
    },
    {
      id: 2,
      name: 'Testeo de Memoria Celular',
      description: 'testeo muscular se presicion.',
      image: image,
      Purchased: false,
    },
    // Agrega más cursos aquí
  ];

  // Filtrar los cursos comprados
  const purchasedCourses = courses.filter((course) => course.Purchased);

  return (
    <div className="mt-44 mx-auto max-w-screen-lg">
      <h1 className="text-4xl text-custom text-center">MIS CURSOS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {purchasedCourses.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={course.image} alt={course.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-500 mt-2">{course.description}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Ver Curso
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-gray-600">
        ¿Quieres comprar más cursos? <a href="/">Haz clic aquí</a>.
      </p>
    </div>
  );
}

export default MyCourses;
