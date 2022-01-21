const API_KEY_POSITION_STACK = '8f04313167a956f65a0316786139ca3e';

// recupere tous les lieux enregistres
export async function getLieux() {
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

// recherche un lieu en fonction du terme de recherche
export async function getSearchLieu(searchTerm = '') {
  try {
    // recupere les donnees
    var data = require('../data/data.json');
    var match=[];

    data.lieux.filter((val)=>
    {
      // si aucun terme de recherche alors on envoi tous les lieux
      if(searchTerm == ""){
        match.push(val);
      }
      // sinon si le terme de recherche correspond au nom du lieu, on envoi le lieu en question
      else if(val.lieu.name.toLowerCase().includes(searchTerm.toLowerCase())){
        match.push(val);
      }
    })        
    return match;
  } 
  catch (error){
    console.log(`Error with function searchLieu ${error.message}`);
    throw error;
  }
};

// quand on ajoute un lieu, on appelle l'api pour récupérer les coordonnées.
// On stocke les coordonnées dans le json. Donc on affiche les lieux sur la map a partir du json
// export async function getLieuCoordonnees() {
//   try {
//     // recupere le fichier json
//     var data = require('../data/data.json');
//     var dataLieux = data.lieux;
//     var listeCoordonnees=[];


//       dataLieux.forEach(element => {
//         listeCoordonnees.concat(element.lieu.location.address, element.lieu.location.address);
//         console.log("element=== "+ element.lieu.location.address);
//       });
      
  

//     // const url = `http://api.positionstack.com/v1/forward?access_key=${API_KEY_POSITION_STACK}&query=${adresse}`;
//     // const response = await fetch(url);
//     // const json = await response.json();
//     //return json;
//   } catch (error) {
//     console.log(`Error with function getLieuCoordonnees ${error.message}`);
//     throw error;
//   }
// };

// parcourir getLieux
// pour chaque lieu recuperer adresse
// pour chaque adresse récupérer avece getLieuCoordonnees
// return liste coordonnées

