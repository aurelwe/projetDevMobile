import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Alert, Text, FlatList } from 'react-native';
import { Input, Layout, Icon, Button } from '@ui-kitten/components';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import * as Location from 'expo-location';

const FormulaireAddUpdate = ({ route, navigation, allLieux, dispatch, buttonName, lieuId }) => {

  // tags choisis dans le select
  const [tags, setTags] = useState([]);
  // tags choisis dans le select au bon format pour ajouter
  const [tagsOk, setTagsOk] = useState([]);
  // liste de tous les tags pour le select
  const [tagsList, setTagsList] = useState([]);
  const [name, setNom] = useState("");
  const [adress, setAdresse] = useState("");
  const [description, setDescritpion] = useState("");
  const [city, setVille] = useState("");
  const [zipCode, setCp] = useState("");
  const [country, setCounrty] = useState("");
  // id du lieu qu'on ajoute
  const [id, setId] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // date d'ajout d'un lieu
  const [date, setDate] = useState(null);
  const [telephone, setTelephone] = useState("");
  const [site, setSite] = useState("");

  const [lieux, setLieux] = useState([]);

  // recupere la liste des tags
  const searchTags = async () => {
    try {
      setTagsList(allLieux.tagListe);
    } catch (error) {
      // TO DO
    }
  }

  // récupère les données pour les afficher dans le formulaire de modification
  const editMode = () => {
    try {
      const lieuIdd = allLieux.ajoutLieuxID.filter(item => item.lieu.id == lieuId);
      const mapLieu = lieuIdd.map(element => element.lieu);
      let tagsTest = "";
      mapLieu.forEach(function (lieu) {
        setId(lieu.id);
        setNom(lieu.name);
        setAdresse(lieu.address);
        setVille(lieu.city);
        setCp(lieu.zipcode);
        setCounrty(lieu.country_name);
        setDescritpion(lieu.description);
        setTelephone(lieu.telephone);
        setSite(lieu.site);
        // console.log(lieu.tag)
        tagsTest = lieu.tag;
      });

      // const mapTag = allLieux.tagListe.map(tagInfos => console.log("tagInfos== " + JSON.stringify(tagInfos.item)));
      // const test = tagsTest.map(tagInfos => console.log("tagInfos== " + JSON.stringify(tagInfos)));
      // console.log("tags test====" + JSON.stringify(tagsTest));
      // const mapTag = allLieux.tagListe.filter(itemm => (itemm.item.includes(tagsTest)));
      // console.log("mapTag==" + JSON.stringify(mapTag));
      // console.log("tagsList=========" + JSON.stringify(tagsList));

      // const test = tagsTest.map(function(item){console.log("item== " + JSON.stringify(item))});
      // console.log("tags test====" + JSON.stringify(test));


      // const mapTag = allLieux.tagListe.map(tagInfos => console.log("tagInfos== " + JSON.stringify(tagInfos.item)));
      // const test = tagsTest.foreach(tag => console.log("tag== " + tag));

      // const mapTag = allLieux.tagListe.filter(itemm => (itemm.item.includes(tagsTest)));

      // REMPLACER MANGER PAR LES TAGS DU LIEU
      // const filterTag = allLieux.tagListe.filter(itemm => (itemm.item.includes("Manger")));

      // const filterTag = allLieux.tagListe.filter(itemm => (itemm.item.includes(tagsTest)));
      // console.log("filterTag test====" + JSON.stringify(filterTag));


    } catch (error) {
      // TO DO
    }
  }

  // recupere la position actuelle de l'utilisateur (lat + long) et recupere l'adresse
  const getAdressPositionActuelle = async () => {
    try {
      // recupere la lat et long actuelle de l'utilisateur
      let location = await Location.getCurrentPositionAsync({});
      // avec la lat et long, recupere l'adresse complete
      let adresseActuelle = await Location.reverseGeocodeAsync(location.coords);
      // parcours les donnees de l'adresse
      adresseActuelle.find((element) => {
        // set les elements qui nous interessent pour afficher dans le formulaire
        setAdresse(element.streetNumber + " " + element.street);
        setVille(element.city);
        setCp(element.postalCode);
        setCounrty(element.country);
      });
    } catch (error) {
      // TO DO
      console.log(error);
    }
  }

  // recuperer la latitude et la longitude avec l'adresse saisie 
  const convertAdressToCoords = async () => {
    try {
      // recupere la latitude et longitude en fonction de l'adresse saisie
      let locationCoords = await Location.geocodeAsync(adress + " " + zipCode + " " + city + " " + country);
      // parcours les informations pour recuperer lat et long par rapport a l'adresse
      locationCoords.find((element) => {
        setLatitude(element.latitude);
        setLongitude(element.longitude);
      });
    } catch (error) {
      // TO DO
      console.log(error);
    }
  }

  const navigateToCarte = () => {
    navigation.navigate("Carte");
  };

  // verification des champs du formulaire
  const addUpdate = () => {
    if (buttonName == "Modifier le lieu") {
      if (verifFormulaire() == "OK") {
        updateLieu();
      }
    }

    else if (buttonName == "Ajouter un nouveau lieu") {
      // si tous les champs sont ok
      if (verifFormulaire() == "OK") {
        // on ajoute le lieu et on vide le formulaire
        sauvegarderLieu();
        clearFormulaire();
      }
    }
  }

  // vérifie que les champs obligatoires sont bien remplis
  const verifFormulaire = () => {
    //const emailRegex = new RegExp("#(https?|ftp|ssh|mailto):\/\/[a-z0-9\/:%_+.,\#?!@&=-]+#i");
    // verification des champs
    if (isNaN(zipCode) || zipCode.trim() == 0) {
      Alert.alert("Le code postal est obligatoire et doit comporter uniquement des chiffres");
    }
    else if (name.trim() == 0) {
      Alert.alert('Le nom est obligatoire');
    }
    else if (adress.trim() == 0) {
      Alert.alert('L adresse est obligatoire');
    }
    else if (city.trim() == 0) {
      Alert.alert('La ville est obligatoire');
    }
    else if (country.trim() == 0) {
      Alert.alert('Le pays est obligatoire');
    }
    else if (tags.length == 0) {
      Alert.alert('Les catégories sont obligatoires');
    }
    // else if(!emailRegex.test(site)){
    //   Alert.alert('Les sites !!');
    // }
    else
      return "OK";
  }

  // vide les inputs du formulaire apres la validation
  const clearFormulaire = () => {
    setNom("");
    setTags([]);
    setAdresse("");
    setDescritpion("");
    setVille("");
    setCp("");
    setCounrty("");
    setTelephone("");
    setSite("");
  }


  function onMultiChange() {
    return (item) => setTags(xorBy(tags, [item]));
  }

  const VilleIcon = (props) => (
    <Icon {...props} name='pin' />
  );

  const NoteIcon = (props) => (
    <Icon {...props} name='star' pack='fontawesome' />
  );

  const TelIcon = (props) => (
    <Icon {...props} name='phone' pack='fontawesome' />
  );

  const LinkIcon = (props) => (
    <Icon {...props} name='link' pack='fontawesome' />
  );

  // recupere l'id courant et set le nouvel id
  const getId = async () => {
    // si allLieux ne contient pas de lieu donc vide
    if (Object.keys(allLieux.ajoutLieuxID).length == 0) {
      setId(id + 1);
    }
    // sinon si il existe des lieux
    else if (Object.keys(allLieux.ajoutLieuxID).length > 0) {
      // on recupere le plus grand id qu'il existe
      var dernierID = Math.max(...allLieux.ajoutLieuxID.map(item => item.lieu.id));
      // et id = plus grand id + 1
      setId(dernierID + 1);
    }
  };

  // met les tags au bon format pour sauvegarder
  const tagsOK = async () => {
    // met les tags au bon format dans notre json
    var listeTags = [];
    var tagsSelect = tags;
    for (let value of tagsSelect) {
      listeTags.push(value.item);
    }
    setTagsOk(listeTags);
  }

  // recupere la date du jour pour avoir la date d'ajout pour le tri
  const getDateJour = async () => {
    let today = new Date();
    let date = today.getDate() + "-" + (today.getMonth() + 1) + '-' + today.getFullYear();
    setDate(date);
  }

  // update un lieu
  const updateLieu = async () => {
    let idUpdate = 0;
    const lieuIdd = allLieux.ajoutLieuxID.filter(item => item.lieu.id == lieuId);
    const mapLieu = lieuIdd.map(element => element.lieu);
    mapLieu.forEach(function (lieu) {
      idUpdate = lieu.id;
    });
    // construction du nouveau lieu
    const data = {
      "lieu": {
        "id": idUpdate,
        "name": name,
        "description": description,
        "tag": tagsOk,
        "telephone": telephone,
        "site": site,
        "address": adress,
        "city": city,
        "zipcode": zipCode,
        "latitude": latitude,
        "longitude": longitude,
        "country_name": country,
        "date_ajout": date
      }
    }
    // sauvegarde redux
    const action = { type: 'UPDATE_LIEU', data };
    dispatch(action);
    // sauvegarde les lieux dans la variable
    setLieux(allLieux.ajoutLieuxID);
    navigateToCarte();
    // notification que lieu bien modifie
    let toast = Toast.show('Le lieu est bien modifié', {
      duration: Toast.durations.LONG,
    });
  }

  // sauvegarde un nouveau lieu
  const sauvegarderLieu = async () => {
    // construction du nouveau lieu
    const data = {
      "lieu": {
        "id": id,
        "name": name,
        "description": description,
        "tag": tagsOk,
        "telephone": telephone,
        "site": "http://" + site,
        "address": adress,
        "city": city,
        "zipcode": zipCode,
        "latitude": latitude,
        "longitude": longitude,
        "country_name": country,
        "date_ajout": date
      }
    }
    // sauvegarde redux
    const action = { type: 'ADD_LIEUX', data };
    dispatch(action);
    // sauvegarde les lieux dans la variable
    setLieux(allLieux.ajoutLieuxID);
    navigateToCarte();
    // notification que lieu bien enregistre
    let toast = Toast.show('Le lieu est bien sauvegardé', {
      duration: Toast.durations.LONG,
    });
  }

  useEffect(() => {
    searchTags();
    getId();
    tagsOK();
    convertAdressToCoords();
    getDateJour();
    console.log("TAGS ============" + JSON.stringify(tags));
  }, [adress, city, zipCode, country, tags])

  useEffect(() => {
    editMode();
  }, [lieuId])



  return (

    <React.Fragment>

      <Layout style={styles.container} level='1'>
        <FlatList listKey={"form"}
          ListHeaderComponent={
            <>
              <View style={styles.section}>
                <Text style={styles.textAdresse}>Saisir un nom de lieu</Text>
                <Input
                  style={styles.input}
                  value={name}
                  placeholder='Nom du lieu'
                  onChangeText={(n) => setNom(n)}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.textAdresse}>Saisir une adresse</Text>
                <Input
                  style={styles.input}
                  value={adress}
                  accessoryLeft={VilleIcon}
                  placeholder='Adresse'
                  onChangeText={(a) => setAdresse(a)}
                />
                <View style={styles.rowContainer}>
                  <Input
                    style={styles.inputRow}
                    value={city}
                    accessoryLeft={VilleIcon}
                    placeholder='Ville'
                    onChangeText={(v) => setVille(v)}
                  />
                  <Input
                    style={styles.inputRow}
                    value={zipCode}
                    placeholder='Code postal'
                    onChangeText={(cp) => setCp(cp)}
                  />
                </View>
                <View style={styles.rowContainer}>
                  <Input
                    style={styles.inputRow}
                    value={country}
                    accessoryLeft={VilleIcon}
                    placeholder='Pays'
                    onChangeText={(c) => setCounrty(c)}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Ou</Text>
                  <Button onPress={getAdressPositionActuelle}>Position Actuelle</Button>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.textAdresse}>Autres informations</Text>
                <Input
                  style={styles.input}
                  value={telephone}
                  accessoryLeft={TelIcon}
                  placeholder='Numéro de téléphone'
                  onChangeText={(t) => setTelephone(t)}
                />
                <Input
                  style={styles.input}
                  value={site}
                  accessoryLeft={LinkIcon}
                  placeholder='Site internet'
                  onChangeText={(s) => setSite(s)}
                />

                <Input
                  style={styles.input}
                  value={description}
                  multiline={true}
                  textStyle={{ minHeight: 64 }}
                  placeholder='Description'
                  onChangeText={(d) => setDescritpion(d)}
                />

                <View style={{ paddingTop: 5 }}>
                  <SelectBox
                    label="Choisir une ou plusieurs catégorie(s) "
                    options={tagsList}
                    selectedValues={tags}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    onChange={(t) => setTagsList(t)}
                    isMulti
                  />
                </View>
              </View>

              <Button onPress={addUpdate}>{buttonName}</Button>

            </>
          }>
        </FlatList>
      </Layout>

    </React.Fragment>

  );
}

const mapStateToProps = (state) => {
  return {
    allLieux: state.allLieuxReducer
    // listeVisites: state
  }
}

export default connect(mapStateToProps)(FormulaireAddUpdate);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  input: {
    margin: 2,
  },
  select: {
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    margin: 2,
    flex: 1,
  },
  selectRow: {
    margin: 2,
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  textAdresse: {
    fontWeight: 'bold',
    fontSize: 16
  },
  section: {
    paddingBottom: 15
  }
});