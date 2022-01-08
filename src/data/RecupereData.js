export async function getLieux(searchTerm = '') {
    try {
      let response;
      response = require('../data/data.json');
      return response;
    } catch (error) {
      console.log(`Error with function getLieux ${error.message}`);
      throw error;
    }
  };