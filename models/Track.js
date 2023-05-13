const {Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connection');

//Define the Playlist Model
class Track extends Model {}

//Define the tables
Track.init(
{
    //id
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    //artist
    artist: {
        type: Datatypes.STRING,
        allowNull: false
    },
    //title
    title: {
        type: Datatypes.STRING,
        allowNull: false
    },
    //user_id
    user_id:{
        type: Datatypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'track',
}
);

module.exports = Track;