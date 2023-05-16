const router = require('express').Router();
const { Track } = require('../../models');
const withAuth = require('../../utils/auth');

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