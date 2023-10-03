import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import ReactPaginate from 'react-paginate';

function ReactPlayerVideo() {
  const storedName = localStorage.getItem('name'); // Obtener el nombre almacenado en localStorage

  const videos = [
    { url: 'https://streamable.com/ej7c58' },
    { url: 'https://streamable.com/6ku3tr' },
    // Agrega más videos aquí
  ];

  const videosToShow = storedName ? videos : []; // Mostrar videos solo si hay un nombre en localStorage

  const videosPerPage = 1; // 1 video por página
  const [currentPage, setCurrentPage] = useState(0);

  const renderVideos = () => {
    const startIndex = currentPage * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const videosToRender = videosToShow.slice(startIndex, endIndex);

    return videosToRender.map((video, index) => (
      <div key={index} className="mb-4 border-8 border-purple-200">
        <ReactPlayer className="w-full" controls={true} url={video.url} />
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
    <button className="  text-purple-200 hover:text-purple-400 focus:outline-none">
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
