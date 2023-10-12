import logosinfondo from "../img/logosinfondo.png";

function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-80 bg-white z-50">
      <img
        src={logosinfondo}
        alt="Logo"
        className="w-24 h-24 animate-spin-slow"
      />
    </div>
  );
}

export default Loading;
