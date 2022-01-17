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


export async function getLieuDetails(lieuID) {
  try {
    // recupere le fichier json
    var data = require('../data/data.json');
    var dataLieux = data.lieux;
 
    var found=[];
    // parcours le json pour trouver le lieu correspondant a l'id
    for (var i=0; i < dataLieux.length; i++) {
      if(dataLieux[i].lieu.id == lieuID){
        found= dataLieux[i].lieu;
      }
  }

  return found;

  } catch (error) {
    console.log(`Error with function getLieuDetails ${error.message}`);
    throw error;
  }
};