import { useState, useEffect, useRef, useCallback } from "react";
import VideoControls from "./VideoControls";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";

function ReactPlayerVideo() {
  const getmyvideos = useSelector((state) => state.mycoursesvideos);
  const numPage = useSelector((state) => state.numPage);

  let desde = (numPage - 1) * 1;
  let hasta = numPage * 1;
  let cantPages = Math.floor(getmyvideos.length / 1);
  let viewvideos = getmyvideos.slice(desde, hasta);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playBackRate, setPlayBackRate] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRefs.current[currentVideoIndex];

    if (video) {
      const handleTimeUpdate = async () => await setProgress(video.currentTime);
      const handleDurationChange = async () => await setDuration(video.duration);

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("durationchange", handleDurationChange);

      const videoContainer = document.getElementById("videoContainer");
      videoContainer.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("durationchange", handleDurationChange);
        videoContainer.removeEventListener("contextmenu", (e) => {
          e.preventDefault();
        });
      };
    }
  }, [getmyvideos, numPage, currentVideoIndex]);

  const tooglePlay = useCallback(() => {
    const video = videoRefs.current[currentVideoIndex];
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [currentVideoIndex]);

  const handleVideoEnded = useCallback(() => {
    if (currentVideoIndex < viewvideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  }, [currentVideoIndex, viewvideos]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = e.target.value;
    videoRefs.current[currentVideoIndex].volume = newVolume;
    setVolume(newVolume);
  }, [currentVideoIndex]);

  const handlePlayBackRateChange = useCallback((e) => {
    const newPlayBackRate = e.target.value;
    videoRefs.current[currentVideoIndex].playbackRate = newPlayBackRate;
    setPlayBackRate(newPlayBackRate);
  }, [currentVideoIndex]);

  const toogleFullScreen = useCallback(() => {
    const video = videoRefs.current[currentVideoIndex];
    if (!isFullScreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.webkitRequestFullscreenElement) {
        document.webkitExitFullscreen();
      } else if (video.msRequestFullscreenElement) {
        document.msExitFullscreen();
      } else if (video.mozRequestFullscreenElement) {
        document.mozCancelFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen, currentVideoIndex]);

  const handleProgressChange = useCallback((e) => {
    const newProgress = e.target.value;
    videoRefs.current[currentVideoIndex].currentTime = newProgress;
    setProgress(newProgress);
  }, [currentVideoIndex]);

  return (

<div>
  <div className="">
    
  {
  viewvideos && viewvideos.map((el, index) => (
    <div className="" key={index}>
      <div className="flex justify-center">
      <h1 className=" text-5xl text-center flex font-semibold text-black">{el.nombre}</h1>
      </div>
     
        
        <div  className="flex justify-center">
        <h1 className=" text-black">{el.descripcion}</h1>
        </div>
     
        </div>
  ))
}
  </div>
      <div
        id="videoContainer"
        className="relative border shadow-2xl shadow-black rounded-md overflow-hidden w-[900px] h[500px] drop-shadow-sm group"
      >
        {viewvideos?.map((el, i) => {
          return (
            <video
            
              key={i}
              
              src={el.link}
              controlsList="nodownload"
              className="w-[1000px] h-full object-cover"
              ref={(el) => (videoRefs.current[i] = el)}
              onClick={tooglePlay}
              onEnded={handleVideoEnded}
              style={{ display: i === currentVideoIndex ? "block" : "none" }}
              ></video>
          );
        })}
        <VideoControls
          progress={progress}
          duration={duration}
          isPlaying={isPlaying}
          volume={volume}
          playbackrate={playBackRate}
          isFullScreen={isFullScreen}
          tooglePlay={tooglePlay}
          handleVolumeChange={handleVolumeChange}
          handleProgressChange={handleProgressChange}
          toogleFullScreen={toogleFullScreen}
          handlePlayBackRateChange={handlePlayBackRateChange}
        />
      </div>
      <Pagination cantPages={cantPages} />
    </div>
  );
}

export default ReactPlayerVideo;
