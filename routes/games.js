const express = require("express");
const router = express.Router({ mergeParams: true });
const gamesController = require("../controllers/gamesController");

// Create new game form
router.get("/new", gamesController.getNewGameForm);

// Create new game
router.post("/", gamesController.createGame);

// Show single game detail
router.get("/:gameId", gamesController.getGameDetail);

// Delete single game
router.post("/:gameId/delete", gamesController.deleteGame);

module.exports = router;
