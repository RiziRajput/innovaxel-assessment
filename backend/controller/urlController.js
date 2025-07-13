const Url = require("../model/url");
const generateShortCode = require("../utils/generateShortUrl");

// CREATE Short URL (POST /api/shorten)
exports.createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Original URL is required." });
  }

  try {
    let shortCode;
    let existing;

    do {
      shortCode = generateShortCode();
      existing = await Url.findOne({ shortCode });
    } while (existing);

    const newUrl = new Url({
      url,
      shortCode,
    });

    await newUrl.save();

    res.status(201).json(newUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while creating short URL." });
  }
};

//  RETRIEVE Original URL (GET /api/shorten/:shortCode)
exports.getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    // Count access
    urlEntry.accessCount += 1;
    await urlEntry.save();

    res.status(200).json({
      id: urlEntry._id,
      url: urlEntry.url,
      shortCode: urlEntry.shortCode,
      createdAt: urlEntry.createdAt,
      updatedAt: urlEntry.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while retrieving URL." });
  }
};

//  UPDATE Short URL (PUT /api/shorten/:shortCode)
exports.updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Updated URL is required." });
  }

  try {
    const urlEntry = await Url.findOneAndUpdate(
      { shortCode },
      { url, updatedAt: Date.now() },
      { new: true }
    );

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    res.status(200).json(urlEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating URL." });
  }
};

// DELETE Short URL (DELETE /api/shorten/:shortCode)
exports.deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while deleting URL." });
  }
};

// GET Stats (GET /api/shorten/:shortCode/stats)
exports.getStats = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    res.status(200).json({
      id: urlEntry._id,
      url: urlEntry.url,
      shortCode: urlEntry.shortCode,
      createdAt: urlEntry.createdAt,
      updatedAt: urlEntry.updatedAt,
      accessCount: urlEntry.accessCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while retrieving stats." });
  }
};

// GET All URLs (GET /api/shorten)
exports.getAllUrls = async (req, res) => {
  try {
    console.log("Fetching all URLs..."); // Add this line
    const urls = await Url.find();
    console.log("URLs found:", urls); // Add this line
    if (!urls || urls.length === 0) {
      return res.status(404).json({ error: "No URLs found" });
    }
    res.status(200).json(urls);
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};
