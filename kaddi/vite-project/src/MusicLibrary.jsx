import React, { useState } from "react";
import "./MusicLibrary.css";
const MusicLibrary = () => {
  const [songs, setSongs] = useState([
    { id: 1, name: "Song A" },
    { id: 2, name: "Song B" },
    { id: 3, name: "Song C" },
  ]);

  const removeSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <div>
      <h2>Music Library</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.name}
            <button onClick={() => removeSong(song.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicLibrary;
