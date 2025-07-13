// server.js
require('dotenv').config(); // ← FIRST LINE
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const urlRoutes = require('./routes//urlRoutes');
const connectDB = require('./config/db');
const Url = require('./model/url'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/shorten', urlRoutes);

// Public short URL redirect route
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry) {
      return res.status(404).send("Short URL not found.");
    }

    // Increase the hit count
    urlEntry.accessCount += 1;
    await urlEntry.save();

    // Redirect to the original long URL
    return res.redirect(urlEntry.url);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while redirecting.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
