import { useState, useEffect, useRef, useCallback } from "react";
import VideoControls from "./VideoControls";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";

function ReactPlayerVideo() {
 
  const getmyvideos = useSelector(state => state.mycoursesvideos);
  const numPage = useSelector((state) => state.numPage);


  let desde = (numPage - 1) * 1;
  let hasta = numPage * 1;
  let cantPages = Math.floor(getmyvideos.length / 1);
  let viewvideos = getmyvideos.slice(desde, hasta)
 
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playBackRate, setPlayBackRate] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
 
  useEffect(() => {
    const video = videoRef.current;
    
  console.log(video);
    if (video) {
      const handleTimeUpdate =  async ()  =>await setProgress(video.currentTime);
      const handleDurationChange =  async () => await setDuration(video.duration);
      console.log("numPage:", numPage);
      console.log("viewvideos:", viewvideos);
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("durationchange", handleDurationChange);
     
      const videoContainer = document.getElementById("videoContainer");
      videoContainer.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Evita que se abra el menú contextual
      });
      setCurrentVideoIndex(0);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("durationchange", handleDurationChange);
        videoContainer.removeEventListener("contextmenu", (e) => {
          e.preventDefault();
        });
      };
    }
  }, [getmyvideos,numPage]);

  const tooglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    // Cuando un video termina, avanza al siguiente si hay más videos
    if (currentVideoIndex < viewvideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  }, [currentVideoIndex, viewvideos]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  }, []);

  const handlePlayBackRateChange = useCallback((e) => {
    const newPlayBackRate = e.target.value;
    videoRef.current.playbackRate = newPlayBackRate;
    setPlayBackRate(newPlayBackRate);
  }, []);

  const toogleFullScreen = useCallback(() => {
    const video = videoRef.current;
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
  }, [isFullScreen]);

  const handleProgressChange = useCallback((e) => {
    const newProgress = e.target.value;
    videoRef.current.currentTime = newProgress;
    setProgress(newProgress);
  }, []);

  return (
   <div>
    <div
      id="videoContainer"
      className="relative  border shadow-2xl shadow-black rounded-md overflow-hidden w-[900px] h[500px] drop-shadow-sm group"
    >
      {
         viewvideos?.map((el, i) => {
          return (
            <video
              key={i}
              src={el.link}
              controlsList="nodownload"
              className="w-ful h-full object-cover"
              ref={videoRef}
              onClick={tooglePlay}
              onEnded={handleVideoEnded} // Detecta cuando un video termina
              style={{ display: i === currentVideoIndex ? "block" : "none" }}
           
            ></video>
          )
        })
      }
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
      <div>
    </div>
   
    </div>
    <Pagination cantPages={cantPages} /></div>  
  );
}

export default ReactPlayerVideo;