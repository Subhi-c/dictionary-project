import React, { useRef, useState, useEffect } from "react";

function Audiocomponent({ audiosrc }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false); // Reset to "Play" when the audio finishes
    };

    // Attach event listener when the component mounts
    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div className="audio-player">
      <audio ref={audioRef} className="hidden-audio">
        <source src={audiosrc} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <button onClick={togglePlay} className="play-button">
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default Audiocomponent;
