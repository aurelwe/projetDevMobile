import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Alert, Text } from 'react-native';
import { Input, Layout, Icon, Button } from '@ui-kitten/components';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import * as Location from 'expo-location';

const FormulaireAddUpdate  = ({ route, allLieux, dispatch, buttonName, lieuId}) => {

  // tags choisis dans le select
  const [tags, setTags] = useState([]);
  // tags choisis dans le select au bon format pour ajouter
  const [tagsOk, setTagsOk] = useState([]);
  // liste de tous les tags pour le select
  const [tagsList, setTagsList] = useState([]);
  const [name, setNom] = useState("");
  const [adress, setAdresse] = useState("");
  const [description, setDescritpion] = useState("");
  // const [note, setNote] = useState([]);
  const [city, setVille] = useState("");
  const [zipCode, setCp] = useState("");
  const [country, setCounrty] = useState("");
  // id du lieu qu'on ajoute
  const [id, setId] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // date d'ajout d'un lieu
  const [date, setDate] = useState(null);

  const [lieux, setLieux] = useState([]);

  // recupere la liste des tags
  const searchTags = async () => {
    try {
      setTagsList(allLieux.tagListe);
    } catch (error) {
      // TO DO
    }
  }

  // 
  const editMode = async () => {
    try {
      const lieuIdd = allLieux.ajoutLieuxID.filter(item => item.lieu.id == lieuId);
      const mapLieu = lieuIdd.map(element => element.lieu);
      mapLieu.forEach(function (lieu) {
        setNom(lieu.name);
        setAdresse(lieu.address);
        setVille(lieu.city);
        setCp(lieu.zipcode);
        setCounrty(lieu.country_name);
        setDescritpion(lieu.description);
        // setTags(lieu.tag);
      });
    ;
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
        setAdresse(element.street);
        setVille(element.city);
        setCp(element.postalCode);
        setCounrty(element.country);  
      });
    } catch (error) {
      // TO DO
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
    }
  }

  // verification des champs du formulaire
  const verificationFormulaire = () => {
    // verification des champs
    if(isNaN(zipCode) || zipCode.trim() ==0)
    {
      Alert.alert("Le code postal est obligatoire et doit comporter uniquement des chiffres");
    }
    else if (name.trim() ==0) { 
      Alert.alert('Le nom est obligatoire');
    }
    else if (adress.trim() ==0) {
      Alert.alert('L adresse est obligatoire');
    }
    else if (city.trim() ==0) {
      Alert.alert('La ville est obligatoire');
    }
    else if (country.trim() ==0) {
      Alert.alert('Le pays est obligatoire');
    }
    else if (tags.length == 0) {
      Alert.alert('Les catégories sont obligatoires');
    }
    else{ // si tous les champs sont corrects
      // on sauvegarde le lieu et on vide le formulaire
      sauvegarderLieu();
      clearFormulaire();
    } 
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
  }


  function onMultiChange() {
    return (item) => setTags(xorBy(tags, [item]));
  }

  const TagsIcon = (props) => (
    <Icon {...props} name='tag' pack='fontawesome'/>
  );

  const VilleIcon = (props) => (
    <Icon {...props} name='pin'/>
  );

  const NoteIcon = (props) => (
    <Icon {...props} name='star' pack='fontawesome'/>
  );
  
  // recupere l'id courant et set le nouvel id
  const getId = async () => {
    // si allLieux ne contient pas de lieu donc vide
    if(Object.keys(allLieux.ajoutLieuxID).length == 0){
      setId(id+1);
    }
    // sinon si il existe des lieux
    else if (Object.keys(allLieux.ajoutLieuxID).length > 0){
      // on recupere le plus grand id qu'il existe
      var dernierID = Math.max(...allLieux.ajoutLieuxID.map(item => item.lieu.id));
      // et id = plus grand id + 1
      setId(dernierID+1);
    }
  };

  // met les tags au bon format pour sauvegarder
  const tagsOK = async () => {
      // met les tags au bon format dans notre json
      var listeTags=[];
      var tagsSelect = tags;
      for (let value of tagsSelect) {
        listeTags.push(value.item);
      }
      setTagsOk(listeTags);
    }

    // recupere la date du jour pour avoir la date d'ajout pour le tri
    const getDateJour = async () => {
      let today = new Date();
      let date = today.getDate() + "-" + (today.getMonth()+1) + '-' + today.getFullYear();
      setDate(date);
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
        "address": adress,
        "city": city,
        "zipcode": zipCode,
        "latitude": latitude, 
        "longitude": longitude,
        "country_name": country,
        "date_ajout" : date
      }
    }
    // sauvegarde redux
    const action = { type: 'ADD_LIEUX', data};
    dispatch(action);
    // sauvegarde les lieux dans la variable
    setLieux(allLieux.ajoutLieuxID);
    // notification que lieu bien enregistre
    let toast = Toast.show('Le lieu est bien sauvegardé', {
    duration: Toast.durations.LONG,
    });
  }

  useEffect(()=>{
      searchTags();
      getId();
      tagsOK();
      convertAdressToCoords();
      getDateJour();
   },[adress, city, zipCode, country, tags])

   return (

    <React.Fragment>
      <Layout style={styles.container} level='1'>
        <Input
          style={styles.input}
          value={name}
          placeholder='Nom du lieu'
          onChangeText={(n) => setNom(n)}
        />
        <Text>Saisir une adresse</Text>
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
        <Text>Ou</Text>
        <View style={styles.rowContainer}>
          <Button onPress={getAdressPositionActuelle}>Position Actuelle</Button>
        </View>
        <Input
          style={styles.input}
          value={description}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Description'
          onChangeText={(d) => setDescritpion(d)}
        />

        <View style={styles.rowContainer}>
            <SelectBox
              label="Choisir une ou plusieurs catégorie(s) "
              options={tagsList}
              selectedValues={tags}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
            />
            </View>
           {/* <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            placeholder='Note'
            accessoryLeft={NoteIcon}
            onChangeText={(rate) => setNote(rate)}
          />
        </View> */}

        <Button onPress={verificationFormulaire}>{buttonName}</Button>

      </Layout>
    </React.Fragment>
            
  );
}

const mapStateToProps = (state) => {
  return {
    allLieux: state
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
  }
});