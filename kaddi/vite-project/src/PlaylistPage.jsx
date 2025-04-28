import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaylistPage.css";
import { playlistContext } from "./context/PlaylistContext";

const PlaylistPage = () => {
  const p = useContext(playlistContext);
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState(p.playlists || []);

  const handleCreateClick = () => {
    navigate("/playlistForm");
  };

  const handleRemove = (id) => {
    const updated = playlists.filter((playlist) => playlist.id !== id);
    setPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  const handlePlaylistClick = (id) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div className="playlist-page">
      <h2>My Playlists</h2>
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
                handleRemove(playlist.id);
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
