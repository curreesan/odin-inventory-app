const pool = require("../db/pool");

// Form to create new game in a genre
async function getNewGameForm(req, res) {
  const genreId = req.params.genreId;

  try {
    const genreResult = await pool.query("SELECT * FROM genres WHERE id = $1", [
      genreId,
    ]);

    if (genreResult.rowCount === 0) {
      return res.status(404).send("Genre not found");
    }

    const genre = genreResult.rows[0];

    res.render("genres/games/new", {
      title: `Add New Game to ${genre.name}`,
      genre,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

// Create new game
async function createGame(req, res) {
  const genreId = req.params.genreId;
  const { name, cost } = req.body;

  try {
    // Validate cost is positive number
    const parsedCost = parseFloat(cost);
    if (isNaN(parsedCost) || parsedCost < 0) {
      return res.status(400).send("Invalid cost value");
    }

    await pool.query(
      "INSERT INTO games (name, cost, genre_id) VALUES ($1, $2, $3)",
      [name, parsedCost, genreId],
    );

    res.redirect(`/genres/${genreId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating game");
  }
}

// Show single game detail
async function getGameDetail(req, res) {
  const { genreId, gameId } = req.params;

  try {
    const gameResult = await pool.query(
      "SELECT g.*, gen.name AS genre_name FROM games g JOIN genres gen ON g.genre_id = gen.id WHERE g.id = $1 AND g.genre_id = $2",
      [gameId, genreId],
    );

    if (gameResult.rowCount === 0) {
      return res.status(404).send("Game not found");
    }

    const game = gameResult.rows[0];

    res.render("genres/games/show", {
      title: game.name,
      game,
      genreId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

// Delete single game
async function deleteGame(req, res) {
  const { genreId, gameId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM games WHERE id = $1 AND genre_id = $2 RETURNING *",
      [gameId, genreId],
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Game not found");
    }

    res.redirect(`/genres/${genreId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting game");
  }
}

module.exports = {
  getNewGameForm,
  createGame,
  getGameDetail,
  deleteGame,
};
