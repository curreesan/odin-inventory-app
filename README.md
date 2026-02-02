# Odin Inventory App (Game Edition)

A full CRUD inventory management web application built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application) Node.js curriculum.

This version is themed around **games and genres** (instead of generic items/categories).

- **Live Demo**: https://odin-inventory-app-2qt4.onrender.com/genres

---

## Features

- View all genres on the home page
- View detailed genre page with its list of games
- Add new genres
- Add new games to any genre
- View individual game details
- Delete individual games
- Delete entire genres (automatically removes all associated games via manual transaction logic)
- Browser confirmation dialogs before deletes
- Clean nested routing (`/genres` → `/genres/:id/games/:id`)
- Persistent PostgreSQL database
