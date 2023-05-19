const router = require('express').Router();
const { Track, User, Playlist } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/playlist/:id', async (req, res) => {
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
      ...track,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


