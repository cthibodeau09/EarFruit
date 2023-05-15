const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

//create our user model
class User extends Model {
    //defne a method on the User model that we can use to check the users 
    // password as provided in the login route against the hashed database password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
{
    //define an id column
    id: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    //username column
    username: {
        types: DataTypes.STRING,
        allowNull: false,
    },
    //email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    //password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        },
    },
},
{
    //hooks for password
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData
        },
        beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData
        },
},
// define the options for the model
sequelize, 
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'user'
}
);

module.exports = User;