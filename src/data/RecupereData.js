const API_KEY_POSITION_STACK = '8f04313167a956f65a0316786139ca3e';

// recupere tous les lieux enregistres
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

// recupere les details d'un lieu en fonction de son id
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

// recupere les coordonnees d'un lieu en fonction de son adresse
export async function getLieuCoordonnees(adresse) {
  try {
    const url = `http://api.positionstack.com/v1/forward?access_key=${API_KEY_POSITION_STACK}&query=${adresse}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getLieuCoordonnees ${error.message}`);
    throw error;
  }
};

// parcourir getLieux
// pour chaque lieu recuperer adresse
// pour chaque adresse récupérer avece getLieuCoordonnees
// return liste coordonnées
