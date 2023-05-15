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

module.exports = {
  search,
};

