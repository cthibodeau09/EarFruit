const sequelizeInstance = require('../config/connection');
const { User, Track, Playlist } = require('../models');

const userData = require('./userData.json');
const trackData = require('./trackData.json');
const playlistData = require('./playlistData.json');

const seedDatabase = async () => {
  await sequelizeInstance.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const tracks = await Track.bulkCreate(trackData);

  for (const playlist of playlistData) {
    await Playlist.create({
      ...playlist,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
