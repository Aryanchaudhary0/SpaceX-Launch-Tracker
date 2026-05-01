const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  launchId: {
    type: String,
    required: true
  },
  launchName: {
    type: String,
    required: true
  },
  patchImage: {
    type: String,
    default: ""
  },
  date: {
    type: String,
    default: ""
  }
}, { timestamps: true });

// One user can't favorite same launch twice
favoriteSchema.index({ userId: 1, launchId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);