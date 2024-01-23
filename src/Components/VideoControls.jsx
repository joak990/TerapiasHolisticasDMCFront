import { BsPauseFill, BsFillPlayFill } from "react-icons/bs";
import { MdFullscreen } from "react-icons/md";

function VideoControls({
  duration,
  progress,
  volume,
  playbackrate,
  isFullScreen,
  isPlaying,
  tooglePlay,
  handleVolumeChange,
  handleProgressChange,
  toogleFullScreen,
  handlePlayBackRateChange,
}) {
  const FormatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, '0')}`;
  }

  // Versión para escritorio
  const desktopControls = (
    <div className={`hidden md:flex items-center w-[300px] p-1 justify-between bg-black gap-3 md:w-full`}>
      <button className="text-white focus:outline-none" onClick={tooglePlay}>
        {isPlaying ? <BsPauseFill size={24} /> : <BsFillPlayFill size={24} />}
      </button>
      <div className="flex items-center">
        <span className="text-white mr-2">{FormatTime(progress)}</span>
        <div className="relative w-64 h-1.5 bg-gray-600 rounded-full mr-2">
          <input
            type="range"
            min={0}
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            step={1}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute top-0 left-0 h-full bg-bgla rounded-full " style={{ width: `${(progress / duration) * 100}%` }}></div>
        </div>
        <span className="text-white mr-2">{FormatTime(duration)}</span>
      </div>
      <div className="flex items-center">
        <input
          type="range"
          min={0}
          max={1}
          value={volume}
          onChange={handleVolumeChange}
          step={0.1}
          className="w-16 h-1.5 bg-gray-600 rounded-full mr-2"
        />
        <select className="bg-black text-white px-2 py-1 rounded-md focus:outline-none" onChange={handlePlayBackRateChange} value={playbackrate}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
      <button className="text-white focus:outline-none" onClick={toogleFullScreen}>
        <MdFullscreen size={24} />
      </button>
    </div>
  );

  // Versión para móvil
  const mobileControls = (
    <div className={`md:hidden flex items-center w-full justify-between  bg-black `}>
      <button className="text-white md:ml-0 ml-2 focus:outline-none" onClick={tooglePlay}>
        {isPlaying ? <BsPauseFill size={16} /> : <BsFillPlayFill size={16} />}
      </button>
      <div className="flex items-center">
        <span className="text-white md:text-sm text-[8px] mr-2">{FormatTime(progress)}</span>
        <div className="relative w-24 h-1 bg-gray-600 rounded-full mr-2">
          <input
            type="range"
            min={0}
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            step={1}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: `${(progress / duration) * 100}%` }}></div>
        </div>
        <span className="text-white md:text-sm text-[8px] mr-2">{FormatTime(duration)}</span>
      </div>
      <div className="flex items-center">
      <input
  type="range"
  min={0}
  max={1}
  value={volume}
  onChange={handleVolumeChange}
  step={0.1}
  className="md:w-12 w-8 h-2 bg-gray-600 rounded-full mr-2"
  style={{ '--thumb-size': '10px' }}
/>
        <button className="text-white focus:outline-none mr-4" onClick={toogleFullScreen}>
          <MdFullscreen size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {desktopControls}
      {mobileControls}
    </>
  );
}

export default VideoControls;
