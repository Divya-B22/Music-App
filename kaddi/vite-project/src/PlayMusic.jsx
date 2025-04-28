import { useState, useEffect, useRef, useContext } from "react";
import "./PlayMusic.css";
import { useNavigate, useParams } from "react-router-dom";
import { musicContext } from "./context/MusicContext";

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds === 0) {
    return "0:00";
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function PlayMusic() {
  const navigate = useNavigate();
  const { songs } = useContext(musicContext);
  const filePath = useParams().filePath;
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef(null);
  const currentSong = songs.filter((song) => song.file_path == filePath)[0];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleBackClick = () => {
    navigate("/musicApp");
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const previousSong = () => {
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].file_path == filePath) {
        if (i == 0) navigate(`/music/${songs[songs.length - 1].file_path}`);
        else navigate(`/music/${songs[i - 1].file_path}`);
        break;
      }
    }
    setIsPlaying(false);
  };

  const nextSong = () => {
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].file_path == filePath) {
        if (i == songs.length - 1) navigate(`/music/${songs[0].file_path}`);
        else navigate(`/music/${songs[i + 1].file_path}`);
        break;
      }
    }
    setIsPlaying(false);
  };

  return (
    <div className="app">
      <div className="music-player">
        <div className="music-player-container">
          <button
            className="back-button"
            onClick={handleBackClick}
            aria-label="Go back"
          >
            <span className="back-icon"></span>
            <span className="back-text">Back</span>
          </button>

          <div className="song-card">
            <div className={`cover-container ${isPlaying ? "playing" : ""}`}>
              <img
                src={`\\Song_Assets\\Images\\${currentSong.song_image}`}
                alt={`${currentSong.music_name} by ${currentSong.artist}`}
                className="cover-image"
              />
              <div className="vinyl-effect"></div>
            </div>

            <div className="song-info">
              <h2 className="song-title">{currentSong.title}</h2>
              <h3 className="song-artist">{currentSong.artist}</h3>
            </div>
          </div>

          <div className="audio-controls">
            <div className="progress-container">
              <span className="time current">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="progress-bar"
                value={currentTime}
                min="0"
                max={duration || 0}
                step="0.01"
                onChange={handleProgressChange}
              />
              <span className="time duration">{formatTime(duration)}</span>
            </div>

            <div className="controls-container">
              <button
                className="control-button skip-button"
                onClick={previousSong}
                aria-label="Previous song"
              >
                <i className="prev-icon"></i>
              </button>

              <button
                className={`control-button play-button ${
                  isPlaying ? "playing" : ""
                }`}
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <i className={isPlaying ? "pause-icon" : "play-icon"}></i>
              </button>

              <button
                className="control-button skip-button"
                onClick={nextSong}
                aria-label="Next song"
              >
                <i className="next-icon"></i>
              </button>
            </div>

            <div className="volume-container">
              <div className="volume-icon"></div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
              />
            </div>
          </div>

          <audio
            ref={audioRef}
            src={`\\Song_Assets\\Audio\\${filePath}`}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayMusic;
