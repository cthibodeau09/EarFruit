const User = require('./User');
const Track = require('./Track');
const Playlist = require('./Playlist');

app.use(express.static('public/images'));

User.hasMany(Track, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Track.belongsTo(User, {
  foreignKey: 'user_id'
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Track, Playlist };
