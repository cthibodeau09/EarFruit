const router = require('express').Router();
const userRoutes = require('./userRoutes');
const trackRoutes = require('./trackRoutes');
const playlistRoutes = require('./playlistRoutes')

router.use('/users', userRoutes);
router.use('/tracks', trackRoutes);
router.use('/playlist', playlistRoutes);


module.exports = router;

