const pool = require("../db/pool");

// List all genres (home page)
async function getAllGenres(req, res) {
  try {
    const result = await pool.query("SELECT * FROM genres ORDER BY name");
    const genres = result.rows;
    res.render("genres/index", { title: "Game Inventory - Genres", genres });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

// NEW: Form to create genre
async function getNewGenreForm(req, res) {
  res.render("genres/new", { title: "Add New Genre" });
}

// NEW: Create genre
async function createGenre(req, res) {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
    res.redirect("/genres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating genre");
  }
}

// Show genre detail + games
async function getGenreDetail(req, res) {
  const genreId = req.params.genreId;

  try {
    const genreResult = await pool.query("SELECT * FROM genres WHERE id = $1", [
      genreId,
    ]);

    if (genreResult.rowCount === 0) {
      return res.status(404).send("Genre not found");
    }

    const genre = genreResult.rows[0];

    const gamesResult = await pool.query(
      "SELECT * FROM games WHERE genre_id = $1 ORDER BY name",
      [genreId],
    );

    const games = gamesResult.rows;

    res.render("genres/show", {
      title: `${genre.name} Games`,
      genre,
      games,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

// NEW: Delete genre + games
async function deleteGenre(req, res) {
  const genreId = req.params.genreId;

  try {
    await pool.query("BEGIN");

    // Delete all games first
    await pool.query("DELETE FROM games WHERE genre_id = $1", [genreId]);

    // Delete genre
    const result = await pool.query(
      "DELETE FROM genres WHERE id = $1 RETURNING *",
      [genreId],
    );

    if (result.rowCount === 0) {
      throw new Error("Genre not found");
    }

    await pool.query("COMMIT");
    res.redirect("/genres");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    res.status(500).send("Error deleting genre");
  }
}

module.exports = {
  getAllGenres,
  getNewGenreForm,
  createGenre,
  getGenreDetail,
  deleteGenre,
};
