const Favorite = require("../models/Favorite");

// Get all favorites for logged in user
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add favorite
const addFavorite = async (req, res) => {
  try {
    const { launchId, launchName, patchImage, date } = req.body;

    const favorite = await Favorite.create({
      userId: req.user.id,
      launchId,
      launchName,
      patchImage,
      date
    });

    res.status(201).json(favorite);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already in favorites" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Remove favorite
const removeFavorite = async (req, res) => {
  try {
    const { launchId } = req.params;

    await Favorite.findOneAndDelete({
      userId: req.user.id,
      launchId
    });

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };