import axios from "axios";
import React, { useEffect, useState } from "react";

const Addsong = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(image);
  }, [image]);

  const createSong = async () => {
    try {
      const response = await axios.post("/addsong", {
        name,
        file,
        artist,
        image,
      });
      if (response.status == 200) {
        alert(response.data.message);
      }
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Registration failed. Please check the backend server."
      );
    }
  };

  return (
    <div className="playlist-container">
      <h2>Add new song</h2>

      <div className="input-section">
        <div className="image-placeholder">
          {image ? (
            <img
              src={`Song_Assets\\Images\\${image}`}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageUrl = file.name;
                setImage(imageUrl);
              }
            }}
          />
          Choose song file:
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFile(file.name);
              }
            }}
          />
        </div>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="buttons">
        <button
          className="cancel-btn"
          onClick={() => {
            // setPlaylistName("");
            // setCoverUrl("");
            // setSelectedSongs([]);
          }}
        >
          Cancel
        </button>
        <button className="create-btn" onClick={createSong}>
          + Create Playlist
        </button>
      </div>
    </div>
  );
};

export default Addsong;
