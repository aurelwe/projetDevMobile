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


export async function getRestaurantDetails(restaurantID) {
  try {

    let response;
    let test;
    response = require('../data/data.json');
    
    test=response.find(id => id = 2);
    console.log("helloe".test);
    return test;


  } catch (error) {
    console.log(`Error with function getRestaurantDetails ${error.message}`);
    throw error;
  }
};