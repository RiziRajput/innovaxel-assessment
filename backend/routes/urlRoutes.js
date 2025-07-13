const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getStats,
  getAllUrls
} = require("../controller/urlController");

// Create a new short URL
router.post("/", createShortUrl);

// Retrieve the original URL & increment access count
router.get("/:shortCode", getOriginalUrl);

// Update the long/original URL
router.put("/:shortCode", updateShortUrl);

// Delete a short URL
router.delete("/:shortCode", deleteShortUrl);

// Get access statistics for a short URL
router.get("/:shortCode/stats", getStats);

// Get all short URLs for a user 
router.post("/all", getAllUrls);


module.exports = router;
