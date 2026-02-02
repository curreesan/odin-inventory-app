const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");

// List all genres (home)
router.get("/", genresController.getAllGenres);

// Form to create new genre
router.get("/new", genresController.getNewGenreForm);

// Create new genre (POST)
router.post("/", genresController.createGenre);

// Show one genre + its games
router.get("/:genreId", genresController.getGenreDetail);

// Delete genre + its games
router.post("/:genreId/delete", genresController.deleteGenre);

module.exports = router;
