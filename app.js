require("dotenv").config();
const express = require("express");
const path = require("path");
const genresRouter = require("./routes/genres");

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.) later
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", genresRouter); // Home page now shows genres

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
