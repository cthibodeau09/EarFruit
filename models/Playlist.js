const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// Define the Playlist Model
class Playlist extends Model {}

// define table columns and configuration
Playlist.init(
{
    //define an id column
    id: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // name column
    name: {
        types: DataTypes.STRING,
        allowNull: false,
    },
    //user_id column
    user_id: {
        type: DataTypes.INTEGER,
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
    modelName: 'playlist',
}
);

module.exports = Playlist;