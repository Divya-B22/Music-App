import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaylistPage.css";
import { playlistContext } from "./context/PlaylistContext";

const PlaylistPage = () => {
  const p = useContext(playlistContext);
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState(p.playlists || []);

  const handleCreateClick = () => {
    navigate("/playlistForm");
  };

  const handleRemove = async (name) => {
    const updated = playlists.filter(
      (playlist) => playlist.playlist_name != name
    );
    try {
      const response = await axios.delete("/deleteplaylist", {
        data: {
          name,
        },
      });
      if (response.status == 200) setPlaylists(updated);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
    // localStorage.setItem("playlists", JSON.stringify(updated));
  };

  const handlePlaylistClick = (id) => {
    navigate(`/playlist/${id}`);
  };

  const handleBackClick = () => {
    navigate("/musicapp");
  };

  return (
    <div className="playlist-page">
      <div
        className="back-for-playlist"
        onClick={handleBackClick}
        aria-label="Go back"
      >
        <span className="back-icon"></span>
        <span className="back-text">Back</span>
      </div>
      <h2 style={{ color: "white" }}>My Playlists</h2>
      <div className="playlist-list">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="playlist-item"
            onClick={() => handlePlaylistClick(playlist.playlist_name)}
            style={{ cursor: "pointer" }}
          >
            {playlist.image_url && (
              <img
                src={`Playlist_Assets\\${playlist.image_url}`}
                alt={playlist.playlist_name}
                className="cover-img"
              />
            )}

            <div>{playlist.playlist_name}</div>
            {playlist.songs && <div>{playlist.song_count} songs</div>}
            <button
              className="remove-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the click to open details
                handleRemove(playlist.playlist_name);
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="add-playlist" onClick={handleCreateClick}>
          +
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
