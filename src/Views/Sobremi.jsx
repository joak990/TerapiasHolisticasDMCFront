import CardMuestras from "../Components/CardMuestras";
import me from "../img/sobremi.jpg";

function Sobremi() {
  return (
    <div className="flex flex-col items-center mt-32">
      <div className="flex flex-col items-center sm:flex-row">
        <img className="w-[260px] md:w-[370px] md:h-[380px] h-[320px] border-8 border-blue-400 mt-4 sm:mt-22 ml-4" src={me} alt="" />
        <div className="bg-blue-400 mt-4 md:h-[450px] md:w-[900px]  sm:mt-16 w-full sm:w-[70%] ml-4 p-4">
          <div className="text-white text-center mr-2 font-custom font-semibold text-4xl mb-4">Sobre Mi</div>
          <br /><br />
          <p className="text-white font-custom ">
            ¿Quién Soy? <br />Soy Medium desde que nací. Una gran virtud que en algunos momentos me facilitó la vida y en otros me la complicó. Hoy es un Gran Don al servicio de la Evolución del Planeta y de todos los Seres que lo habitamos. <br />Soy Buscadora innata. Amo aprender y experimentar disciplinas en la búsqueda personal de bienestar. <br />Soy maestra desde la cuna. En mis comienzos dentro de la educación formal y luego en cualquier alternativa que implique ofrecer herramientas para activar la Maestría que todos llevamos dentro. <br />Llevo 12 años acompañando procesos evolutivos de sanación, logros cumplidos y autoconocimiento. <br /><br />
            Mi distinción es la auto-exploración y apropiación de todo aquello que resuena conmigo para re-crearme, y acompañar a recrear, una vida llena de paz, liviandad y disfrute. Este es mi legado para vos.
          </p>
        </div>
       
      </div>
      <div className="text-center mt-10">
        <h1 className="text-5xl  text-blue-950 font-roboto mb-4">Conoce mas sobre nosotros</h1>
        <div className="flex flex-col  mt-24 sm:flex-row  gap-10 justify-center items-center">
          <CardMuestras className="mt-10"/>
          <CardMuestras className="mt-2" />
          <CardMuestras className="mt-2"/>
        </div>
       
      </div>
    </div>
  );
}

export default Sobremi;
