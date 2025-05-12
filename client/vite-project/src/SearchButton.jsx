import React, { useState } from "react";
import "./SearchButton.css";

const dummySongs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
  { id: 2, title: "Levitating", artist: "Dua Lipa" },
  { id: 3, title: "Good 4 U", artist: "Olivia Rodrigo" },
  { id: 4, title: "Stay", artist: "Justin Bieber" },
  { id: 5, title: "As It Was", artist: "Harry Styles" },
];

const SearchButton = () => {
  const [query, setQuery] = useState("");

  const filteredSongs = dummySongs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <h2>Search Songs</h2>
      <input
        type="text"
        placeholder="Search by title or artist..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-box"
      />

      <div className="results">
        {filteredSongs.map((song) => (
          <div key={song.id} className="song-result">
            <strong>{song.title}</strong> — <span>{song.artist}</span>
          </div>
        ))}
        {filteredSongs.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default SearchButton;
