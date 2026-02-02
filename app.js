require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Parse form data (needed for POST/create)
app.use(express.urlencoded({ extended: true }));

// Routers
const genresRouter = require("./routes/genres");

app.use("/genres", genresRouter);
app.use(express.static(path.join(__dirname, "public")));

// Optional: Redirect root to genres list (so http://localhost:3000 goes to home)
app.get("/", (req, res) => {
  res.redirect("/genres");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
