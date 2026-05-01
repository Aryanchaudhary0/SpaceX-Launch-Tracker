const express = require("express");
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require("../controllers/favoritesController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getFavorites);
router.post("/", protect, addFavorite);
router.delete("/:launchId", protect, removeFavorite);

module.exports = router;