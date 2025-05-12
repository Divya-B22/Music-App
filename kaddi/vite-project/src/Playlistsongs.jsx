import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { musicContext } from "./context/MusicContext";

const Playlistsongs = ({ playlist_name }) => {
  const navigate = useNavigate();
  const { updateSongs, songs } = useContext(musicContext);

  useEffect(() => {
    const getPlaylistSongs = async () => {
      try {
        const response = await axios.get(`/playlistsong/${playlist_name}`);
        if (response.status == 200) {
          updateSongs(response.data.playlistSongs);
        }
      } catch (e) {
        alert(e.response?.data?.message || e.message);
      }
    };
    getPlaylistSongs();
  }, [playlist_name]);

  return (
    <div>
      <section className="section">
        <h2 className="section-title">Popular Songs</h2>
        <div className="songs-grid">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <div
                key={index}
                className="song-card"
                onClick={() => navigate(`/music/${song.file_path}`)}
              >
                <img
                  src={`\\Song_Assets\\Images\\${song.song_image}`}
                  alt={song.music_name}
                  className="song-image"
                />
                <div className="song-name">{song.music_name}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
            ))
          ) : (
            <div>Playlist Empty</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Playlistsongs;
