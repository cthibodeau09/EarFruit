const User = require("./User");
const Track = require("./Track");
const Playlist = require("./Playlist");

User.hasMany(Track, Playlist, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Track.belongsTo(User, {
  foreignKey: "user_id",
});

Playlist.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Track, Playlist };
