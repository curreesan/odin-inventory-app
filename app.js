const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.) later
app.use(express.static(path.join(__dirname, "public")));

// Temporary home route to test EJS
app.get("/", (req, res) => {
  res.render("index", { title: "Game Inventory" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
