import React, { useEffect, useState } from "react";
import { createContext } from "react";

const musicContext = createContext();

const MusicContext = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const updateSongs = (newArray) => {
    setSongs(newArray);
  };
  useEffect(() => {
    console.log(songs);
  }, [songs]);
  return (
    <musicContext.Provider value={{ songs, updateSongs }}>
      {children}
    </musicContext.Provider>
  );
};

export { MusicContext, musicContext };
