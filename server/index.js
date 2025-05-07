const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

// PORT on which the server is running
const PORT = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "musicapp",
  // password: "221704",
  password: "Pr@tz19D",
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please Provide all the details!" });
  try {
    let qry = `select * from user where email=? and blocked=false; `;
    connection.query(qry, [email], function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error!!!!!" });
      }
      if (result.length == 0) {
        return res
          .status(404)
          .json({ message: "user not found! or has been blocked" });
      } else {
        qry = `select username,email from user where email=? and password=? `;
        connection.query(qry, [email, password], function (err, result) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Internal server error!!!!!" });
          }
          if (result.length == 0)
            return res.status(401).json({ message: "Invalid Password!" });
          return res.status(200).json({
            message: "User Logged In Successfully!",
            user: { email: result[0].email, username: result[0].username },
          });
        });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error!!!!!" });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Please Provide all the details!" });
  try {
    let qry = `select * from user where email=? `;
    connection.query(qry, [email], function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error!!!!!" });
      }
      if (result.length != 0) {
        return res.status(409).json({ message: "Email already in use!" });
      } else {
        qry = "insert into user values(?,?,?);";
        connection.query(qry, [name, email, password], function (err, result) {
          if (err)
            return res
              .status(500)
              .json({ message: "Internal Server Error!!!!!" });
          return res
            .status(200)
            .json({ message: "User registered Successfully!" });
        });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error!!!!!" });
  }
});

app.get("/songs", (req, res) => {
  try {
    let qry = "select * from music;";
    connection.query(qry, function (err, result) {
      if (err)
        return res.status(500).json({ message: "Internal Server Error!!!!!" });
      return res.status(200).json({ songs: result });
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error!!!!!" });
  }
});

app.post("/playlist", (req, res) => {
  const { name, songs, coverUrl, email } = req.body;
  if (!name || !songs || !coverUrl || !email)
    return res.status(400).json({ message: "Please Provide all the details!" });
  try {
    let qry = "select * from playlist where playlist_name=?";
    connection.query(qry, [name], function (err, result) {
      if (err)
        return res.status(500).json({ message: "Internal Server Error!!!!!" });
      if (result.length > 0) {
        return res
          .status(409)
          .json({ message: "Playlist name already exists!" });
      } else {
        qry = "insert into playlist values(?,?,?,?,?);";
        connection.query(
          qry,
          [name, coverUrl, email, songs.length, false],
          function (err, result) {
            if (err)
              return res
                .status(500)
                .json({ message: "Internal Server Error!!!!!" });
            else {
              const bridgeQry =
                "INSERT INTO bridge (playlist_name, music_name) VALUES ?";
              const values = songs.map((song) => [name, song]);
              connection.query(bridgeQry, [values], function (err, result) {
                if (err) {
                  return res
                    .status(500)
                    .json({ message: "Internal Server Error!!!!!" });
                } else {
                  return res.status(200).json({ message: "Playlist created" });
                }
              });
            }
          }
        );
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error!!!!!" });
  }
});

app.get("/:email/playlist", (req, res) => {
  const { email } = req.params;
  try {
    let qry =
      "select playlist_name,image_url,song_count,liked from playlist join user on playlist.email=user.email where user.email=?;";
    connection.query(qry, [email], function (err, result) {
      if (err)
        return res.status(500).json({ message: "Internal Server Error!!!!!" });
      else {
        return res.status(200).json({ playlists: result });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error!!!!!" });
  }
});

app.get("/admin/getuser", (req, res) => {
  try {
    const qry = "select * from user;";
    connection.query(qry, function (err, result) {
      if (err)
        return res.status(500).json({ message: "Internal Server Error!!!!!" });
      return res.status(200).json({ users: result });
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error!!!!!" });
  }
});

app.put("/admin/block", (req, res) => {
  const { email, status } = req.body;
  try {
    let qry = "select * from user where email=?";
    connection.query(qry, [email], function (err, result) {
      if (err)
        return res.status(500).json({ message: "Internal Server Error!!!!!" });
      qry = "update user set blocked=? where email=?";
      connection.query(qry, [status, email], function (err, result) {
        if (err)
          return res
            .status(500)
            .json({ message: "Internal Server Error!!!!!" });
        return res.status(200).json({ message: "User blocked" });
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error!!!!!" });
  }
});
// listening on localhost:3000/ route with get request
app.get("/", (req, res) => {
  res.send("THIS IS SERVER");
});

app.listen(PORT, () => {
  console.log("Server is running");
});
