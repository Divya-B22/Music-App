import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Registration from "./Registration";
import Login from "./Login";
import Admin from "./Admin"; // Import Admin component
import MusicApp from "./MusicApp";
import PlaylistForm from "./PlaylistForm";
import PlaylistPage from "./PlaylistPage";
import UserProfile from "./UserProfile";
import SearchButton from "./SearchButton";
import AdminPage from "./AdminPage";
import Addsong from "./Addsong";
import MusicLibrary from "./MusicLibrary";
import UserInfo from "./UserInfo";
import axios from "axios";
import PlayMusic from "./PlayMusic";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <Routes>
      <Route path="/signup" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admindashboard" element={<h2>Welcome, Admin!</h2>} />
      {/* This is an example component */}
      <Route path="/musicapp" element={<MusicApp />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/playlistform" element={<PlaylistForm />} />
      <Route path="/playlistpage" element={<PlaylistPage />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/searchbutton" element={<SearchButton />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/musiclibrary" element={<MusicLibrary />} />
      <Route path="/userinfo" element={<UserInfo />} />
      <Route path="/admin/song" element={<Addsong />} />
      <Route path="/music/:filePath" element={<PlayMusic />} />
    </Routes>
  );
}

export default App;
