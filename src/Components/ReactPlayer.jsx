import { useState, useEffect, useRef, useCallback } from "react";
import VideoControls from "./VideoControls";
import { useSelector } from "react-redux";

function ReactPlayerVideo() {
 
  const getmyvideos = useSelector(state => state.mycoursesvideos);

 

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playBackRate, setPlayBackRate] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
  
    if (video) {
      const handleTimeUpdate = () => setProgress(video.currentTime);
      const handleDurationChange = () => setDuration(video.duration);
  
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("durationchange", handleDurationChange);
  
      const videoContainer = document.getElementById("videoContainer");
      videoContainer.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Evita que se abra el menú contextual
      });
  
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("durationchange", handleDurationChange);
        videoContainer.removeEventListener("contextmenu", (e) => {
          e.preventDefault();
        });
      };
    }
  }, []);

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
    <div
      id="videoContainer"
      className="relative  border shadow-2xl shadow-black rounded-md overflow-hidden w-[900px] h[500px] drop-shadow-sm group"
    >
      {
        getmyvideos && getmyvideos?.map((el, i) => {
          return (
            <video
              key={i}
              src={el.link}
              controlsList="nodownload"
              className="w-ful h-full object-cover"
              ref={videoRef}
              onClick={tooglePlay}
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
    </div>
  );
}

export default ReactPlayerVideo;
