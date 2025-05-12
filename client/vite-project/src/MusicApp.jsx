import { Home, Search, User, Heart } from "lucide-react";
import Songsandplaylists from "./Songsandplaylists";
import Playlistsongs from "./Playlistsongs";
import { Link } from "react-router-dom";
import "./MusicApp.css";
import { useEffect, useState } from "react";

function MusicApp() {
  const [isPlaylistPage, setIsPlaylistPage] = useState(false);
  const [playlist_name, setPlaylist_name] = useState(null);
  const updateIsPlaylistPage = (p_name) => {
    setIsPlaylistPage(!isPlaylistPage);
    if (p_name) {
      setPlaylist_name(p_name);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <nav className="nav-sidebar">
        <Link
          to="#"
          onClick={() => updateIsPlaylistPage()}
          className="nav-item active"
        >
          <Home size={24} />
          <span>Home</span>
        </Link>
        {/* <Link to="/searchbutton" className="nav-item">
          <Search size={24} />
          <span>Search</span>
        </Link> */}
        <Link to="/userprofile" className="nav-item">
          <User size={24} />
          <span>Profile</span>
        </Link>
        <Link to="/playlistpage" className="nav-item">
          <Heart size={24} />
          <span>Playlilst</span>
        </Link>
      </nav>

      {/* Main Content */}
      {isPlaylistPage ? (
        <Playlistsongs playlist_name={playlist_name} />
      ) : (
        <Songsandplaylists updateIsPlaylistPage={updateIsPlaylistPage} />
      )}
    </div>
  );
}

export default MusicApp;
