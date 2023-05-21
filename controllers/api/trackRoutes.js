const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const discogsAccessToken = process.env.DISCOGS_ACCESS_TOKEN;
const withAuth = require('../../utils/auth');

// Search tracks, artists, or albums
router.get('/search', async (req, res) => {
  try {
    const { query, type } = req.query;

    const response = await axios.get('https://api.discogs.com/database/search', {
      params: {
        q: query,
        token: discogsAccessToken,
        type,
      },
    });

    const searchResults = response.data.results.map((result) => {
      let image;
      if (result.cover_image) {
        image = result.cover_image;
      } else if (result.thumb) {
        image = result.thumb;
      } else {
        image = ''; // Set a default image if no image is available
      }

      return {
        title: result.title,
        uri: result.uri,
        image,
      };
    });

    res.render('homepage', { searchResults, projects: [] });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'An error occurred during search.' });
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newTrack = await Track.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTrack);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const trackData = await Track.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!trackData) {
      res.status(404).json({ message: 'No tracks found with this id!' });
      return;
    }

    res.status(200).json(trackData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
