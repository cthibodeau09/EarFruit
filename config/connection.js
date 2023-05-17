<<<<<<< HEAD
const axios = require('axios');
require('dotenv').config();

const discogsAccessToken = process.env.DISCOGS_ACCESS_TOKEN;

// Example function to search for songs, albums, or artists using the Discogs API
async function search(query, type) {
  try {
    const response = await axios.get('https://api.discogs.com/database/search', {
      params: {
        q: query,
        // before demonstrating or testing, replaced with the current access token
        token: discogsAccessToken,
        type: type,
      },
    });

    const results = response.data.results;
    return results;
  } catch (error) {
    console.error('Error searching:', error);
    throw error;
  }
}
<<<<<<< HEAD
=======

module.exports = {
  search,
};
=======
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
      }
    );
  }
  
  module.exports = sequelize;
>>>>>>> 6229143 (connection.js and .env base)
>>>>>>> 4a053aa (connection.js and .env base)
