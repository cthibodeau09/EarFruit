const axios = require('axios');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const PuTywyfYoWUqklKwSInJxtjyzEiZGGMrhTFCrQFo = process.env.DISCOGS_ACCESS_TOKEN;

let sequelizeInstance;


if (process.env.JAWSDB_URL) {
  sequelizeInstance = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelizeInstance = new Sequelize(
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
console.log (sequelizeInstance)
module.exports = sequelizeInstance;

// Example function to search for songs, albums, or artists using the Discogs API
async function search(query, type) {
  try {
    const response = await axios.get('https://api.discogs.com/database/search', {
      params: {
        q: query,
        // before demonstrating or testing, replaced with the current access token
        token: PuTywyfYoWUqklKwSInJxtjyzEiZGGMrhTFCrQFo,
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
