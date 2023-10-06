import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import ReactPaginate from 'react-paginate';

function ReactPlayerVideo() {
  const storedName = localStorage.getItem('email');

  const videos = [
    { url: 'https://streamable.com/ej7c58' },
    { url: 'https://streamable.com/6ku3tr' },
    // Agrega más videos aquí
  ];

  const videosToShow = storedName ? videos : [];

  const videosPerPage = 1;
  const [currentPage, setCurrentPage] = useState(0);

  const videoRef = useRef(null); // Referencia al elemento de video

  useEffect(() => {
    const videoContainer = document.getElementById('videoContainer');

    // Agregar manejador de eventos de clic derecho al contenedor del video
    videoContainer.addEventListener('contextmenu', (e) => {
      e.preventDefault(); // Evita que se abra el menú contextual
    });

    return () => {
      // Limpiar el manejador de eventos al desmontar el componente
      videoContainer.removeEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const renderVideos = () => {
    const startIndex = currentPage * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const videosToRender = videosToShow.slice(startIndex, endIndex);

    return videosToRender.map((video, index) => (
      <div key={index} className="mb-4 border-8 border-purple-200" id="videoContainer">
        <ReactPlayer
          className="w-full"
          controls={true}
          url={video.url}
          playing={true}
          ref={videoRef}
        />
      </div>
    ));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      {renderVideos()}

      <ReactPaginate
        previousLabel={
          <button className="text-purple-200 hover:text-purple-400 focus:outline-none">
            Anterior
          </button>
        }
        nextLabel={
          <button className="text-purple-200 hover:text-purple-400 focus:outline-none">
            Siguiente
          </button>
        }
        breakLabel={'...'}
        pageCount={Math.ceil(videosToShow.length / videosPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default ReactPlayerVideo;
