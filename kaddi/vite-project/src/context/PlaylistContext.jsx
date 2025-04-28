import React, { useEffect, useState } from "react";
import { createContext } from "react";

const playlistContext = createContext();

const PlaylistContext = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const updatePlaylists = (newArray) => {
    setPlaylists(newArray);
  };

  useEffect(() => {
    console.log("PLAYLIST");
    console.log(playlists);
  }, [playlists]);

  return (
    <playlistContext.Provider value={{ playlists, updatePlaylists }}>
      {children}
    </playlistContext.Provider>
  );
};

export { PlaylistContext, playlistContext };
