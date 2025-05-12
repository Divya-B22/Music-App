import React from "react";
import ReactDOM from "react-dom/client";
import { UserContext } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import { MusicContext } from "./context/MusicContext";
import { PlaylistContext } from "./context/PlaylistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContext>
      <PlaylistContext>
        <MusicContext>
          <App />
        </MusicContext>
      </PlaylistContext>
    </UserContext>
  </BrowserRouter>
);
