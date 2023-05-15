const {Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connection');

//Define the Track Model
class Track extends Model {}

//Define the tables
Track.init(
{
    //id
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    //artist
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //title
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //user_id
    user_id:{
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
    modelName: 'track',
}
);

module.exports = Track;