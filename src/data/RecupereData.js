import * as Location from 'expo-location';
const API_KEY_POSITION_STACK = '8f04313167a956f65a0316786139ca3e'; 
const data = require('../data/data.json');

// recupere les details d'un lieu en fonction de son id
export async function getLieuDetails(lieuID) {
  try {
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

  
  // recupere la position actuelle de l'utilisateur
  export async function getPositionActuelle() {
    try {
      return positionActuelleUser = Location.getCurrentPositionAsync({});
    } catch (error) {
      console.log(`Error with function getPositionActuelle ${error.message}`);
      throw error;
    }
  }

    // TEST MAIS API DOWN ....
    export async function getPositionActuelleVille() {
      try {
        const lat= getPositionActuelle.coords.latitude;
        const long= getPositionActuelle.coords.longitude;
        const url = `http://api.positionstack.com/v1/reverse?access_key=${API_KEY_POSITION_STACK}&query=${lat,long}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        return json;
      } catch (error) {
        console.log(`Error with function getPositionActuelleVille ${error.message}`);
        throw error;
      }
    }

// recupere tous les tags
export async function getTags() {
  try {
    var dataLieux = data.tagListe;
    return dataLieux;
  } catch (error) {
    console.log(`Error with function getTags ${error.message}`);
    throw error;
  }
};

// recupere toutes les villes
export async function getVilles() {
  try {
    var dataLieux = data.lieux;
    var lieux=[];
    // ajoute un champs vide pour la recherche dans leselect de la ville 
    // autre technique ?
    lieux.push("");

    // parcours le json pour lister les villes
    for (let value of dataLieux) {
        lieux.push(value.lieu.location.city);
    }
    // return la liste des lieux sans doublons
    return [...new Set(lieux)];
  } catch (error) {
    console.log(`Error with function getVilles ${error.message}`);
    throw error;
  }
};

// recherche les lieux + fonction du terme de recherche
export async function getLieux(searchTermNom = '', ville = '', tags = '') {
  try {
    const dataArray = [...data["lieux"]];
    // filtre sur le nom et la ville
    var result = dataArray.filter(item => item.lieu.name.toLowerCase().includes(searchTermNom.toLowerCase()))
                          .filter(item => item.lieu.location.city.toLowerCase().includes(ville.toLowerCase()))     
    // filtre sur les tags si il y en a
    if(tags != ""){
      result = result.filter(item => tags.some(el => item.lieu.tag.includes(el.item)))
    }
            
    return result
  } 
  catch (error){
    console.log(`Error with function getLieux ${error.message}`);
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

