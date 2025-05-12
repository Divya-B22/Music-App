import React, { useContext, useState } from "react";
import "./PlaylistForm.css";
import { useNavigate } from "react-router-dom";
import { musicContext } from "./context/MusicContext";
import { userContext } from "./context/UserContext";
import axios from "axios";
import { playlistContext } from "./context/PlaylistContext";

const PlaylistForm = () => {
  const { songs } = useContext(musicContext);
  const user = useContext(userContext);
  const navigate = useNavigate();
  const { updatePlaylists, playlists } = useContext(playlistContext);
  const allSongs = songs || [];
  const [playlistName, setPlaylistName] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  const toggleSong = (name) => {
    setSelectedSongs((prev) =>
      prev.includes(name)
        ? prev.filter((songName) => songName !== name)
        : [...prev, name]
    );
  };

  const createPlaylist = async () => {
    if (!playlistName || !coverUrl || selectedSongs.length === 0) {
      alert("Please fill all fields.");
      return;
    }

    const selected = allSongs
      .filter((song) => selectedSongs.includes(song.music_name))
      .map((song) => song.music_name);

    alert("Playlist Created:", { playlistName, coverUrl, selected });

    const newPlaylist = {
      name: playlistName,
      songs: selected,
      coverUrl,
      email: user.userDetails.email,
    };

    try {
      const response = await axios.post("/playlist", newPlaylist);
      if (response.status == 200) {
        updatePlaylists([
          ...playlists,
          {
            image_url: coverUrl,
            liked: 0,
            playlist_name: playlistName,
            song_count: selected.length,
          },
        ]);
        navigate("/playlistpage");
      }
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
    // Save to localStorage
    // const existing = JSON.parse(localStorage.getItem("playlists")) || [];
    // localStorage.setItem(
    //   "playlists",
    //   JSON.stringify([...existing, newPlaylist])
    // );

    navigate("/playlistpage");
  };

  const goToMusicApp = () => {
    navigate("/musicapp");
  };

  return (
    <div className="playlist-container">
      <h2>Create New Playlist</h2>

      <div className="input-section">
        <div className="image-placeholder">
          {coverUrl ? (
            <img
              src={`Playlist_Assets\\${coverUrl}`}
              alt="Cover"
              className="cover-preview"
            />
          ) : (
            "Image"
          )}
        </div>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageUrl = file.name;
                setCoverUrl(imageUrl);
              }
            }}
          />
        </div>
      </div>

      <h3>Select Songs</h3>
      <div className="song-list">
        {allSongs.map((song, index) => (
          <div
            key={index}
            className={`song-item ${
              selectedSongs.includes(song.music_name) ? "selected" : ""
            }`}
            onClick={() => toggleSong(song.music_name)}
          >
            <div>
              <strong>{song.music_name}</strong>
              <div className="artist">{song.artist}</div>
            </div>
            <div className="right">
              <span className="plus-icon">
                {selectedSongs.includes(song.music_name) ? "✓" : "+"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button
          className="cancel-btn"
          onClick={() => {
            setPlaylistName("");
            setCoverUrl("");
            setSelectedSongs([]);
          }}
        >
          Cancel
        </button>
        <button className="create-btn" onClick={createPlaylist}>
          + Create Playlist
        </button>
        <button className="back-btn" onClick={goToMusicApp}>
          Home
        </button>
      </div>
    </div>
  );
};

export default PlaylistForm;
