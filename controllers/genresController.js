const pool = require("../db/pool");

async function getAllGenres(req, res) {
  try {
    const result = await pool.query("SELECT * FROM genres ORDER BY name");
    const genres = result.rows;
    res.render("index", { title: "Game Inventory", genres });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

async function getGenreDetail(req, res) {
  const genreId = req.params.id;

  try {
    //get genre info
    const genreResult = await pool.query("SELECT * FROM genres WHERE id = $1", [
      genreId,
    ]);

    if (genreResult.rowCount === 0) {
      return res.status(404).send("Genre not found");
    }

    const genre = genreResult.rows[0];

    const gameResult = await pool.query(
      "SELECT * FROM games WHERE genre_id = $1 ORDER BY name",
      [genreId],
    );

    const games = gameResult.rows;

    res.render("genre", {
      title: `${genre.name} Games`,
      genre,
      games,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

module.exports = { getAllGenres, getGenreDetail };
