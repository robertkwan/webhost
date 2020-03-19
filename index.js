require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const fetch = require("node-fetch");
const session = require("express-session");
const router = express.Router();

app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

const dir = path.join(__dirname, "./public");
const dirViews = path.join(__dirname, "./templates/views");
const partialPaths = path.join(__dirname, "./templates/partials");

app.use(express.static(dir));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", dirViews);
hbs.registerPartials(partialPaths);


app.get("/", async (req, res) => {
  res.render("index", {
    title: "Cyber Downlod",
  });
});

app.get("/home", async (req, res) => {
  res.render("index", {
    title: "Cyber Downlod",
  });
});

app.get("/daftaranime", async (req, res) => {
  let anime;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "Ao0ne2yM5NmshCw4fK25I9EbPoIGp1JnmPSjsn5MKFhned1NUt"
    }
  };
  try {
    const response = await fetch(
      "https://jikan1.p.rapidapi.com/top/anime/1/upcoming",
      options
    );
    anime = await response.json();
    req.session.anime = anime;
    console.log(anime);
  } catch (e) {
    console.log(e);
  }
  res.render("daftaranime", {
    title: "Cyber Downlod",
    anime
  });
});

app.get("/download", async (req, res) => {
  res.render("download", {
    title: "Cyber Downlod",
  });
});




// router.get("/", (req, res) => {
//   res.render("index", { error: "" });
// });

app.get("/anime/:id", (req, res) => {
  const sess = req.session;
  const anime = sess.anime.top.filter(item => item.mal_id == req.params.id);
  // console.log(anime);
  res.send(anime);
});

app.get("*", (req, res) => {
  res.render("index", {
    title: "Cyber Download"
  });
});

app.listen(PORT, () => {
  console.log(`Localhost: ${PORT} running!`);
});
