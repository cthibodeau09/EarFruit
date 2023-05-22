const router = require('express').Router();
const { Track, User, Playlist } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
require('dotenv').config();

const discogsAccessToken = process.env.DISCOGS_ACCESS_TOKEN;

router.get('/', async (req, res) => {
    try {
      // Get all tracks and JOIN with user data
      const trackData = await Track.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const tracks = trackData.map((track) => track.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        tracks, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/search', withAuth,  async (req, res) => {
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

    res.render('homepage', { searchResults, track: [] });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'An error occurred during search.' });
  }
});

router.get('/track/:id', async (req, res) => {
    try {
      const trackData = await Track.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const track = trackData.get({ plain: true });
  
      res.render('track', {
        ...track,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Track }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/playlist/:id', withAuth, async (req, res) => {
  try {
    const playlistData = await Playlist.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const playlist = playlistData.get({ plain: true });

    res.render('playlist', {
      ...playlist,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


