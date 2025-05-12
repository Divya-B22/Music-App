import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { musicContext } from "./context/MusicContext";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "./context/UserContext";
import { playlistContext } from "./context/PlaylistContext";

const Songsandplaylists = ({ updateIsPlaylistPage }) => {
  const { songs, updateSongs } = useContext(musicContext);
  const navigate = useNavigate();
  const user = useContext(userContext);
  const { playlists, updatePlaylists } = useContext(playlistContext);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await axios.get("/songs");
        if (response.status == 200) {
          updateSongs(response.data.songs);
        }
      } catch (e) {
        alert(e.response?.data?.message || e.message);
      }
    };
    getSongs();

    const getPlaylists = async () => {
      try {
        const response = await axios.get(`${user.userDetails.email}/playlist`);
        if (response.status == 200) {
          updatePlaylists(response.data.playlists);
        }
      } catch (e) {
        alert(e.response?.data?.message || e.message);
      }
    };
    getPlaylists();
  }, []);
  return (
    <main className="main-content">
      {/* Songs Section */}
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
            <div>No songs available at the moment</div>
          )}
        </div>
      </section>

      {/* Playlists Section */}
      <section className="section">
        <h2 className="section-title">Your Playlists</h2>
        <div className="playlists-grid">
          {playlists.map((p, index) => (
            <div
              key={index}
              className="playlist-card"
              onClick={() => updateIsPlaylistPage(p.playlist_name)}
            >
              <img
                src={`Playlist_Assets\\${p.image_url}`}
                alt={p.playlist_name}
                className="playlist-image"
              />
              <div className="playlist-info">
                <div className="playlist-name">{p.playlist_name}</div>
                <div className="playlist-count">{p.song_count} songs</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Songsandplaylists;
