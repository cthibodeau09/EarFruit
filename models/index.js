const User = require('./User');
const Track = require('./Track');

User.hasMany(Playlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Track.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Track };
