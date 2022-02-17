import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Alert } from 'react-native';
import { Input, Layout, Icon, Button } from '@ui-kitten/components';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import * as Location from 'expo-location';


const AddLieu  = ({ route, allLieux, dispatch}) => {


  const [tags, setTags] = useState([]);
  const [tagsOk, setTagsOk] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [name, setNom] = useState("");
  const [adress, setAdresse] = useState("");
  const [description, setDescritpion] = useState("");
  const [note, setNote] = useState([]);
  const [city, setVille] = useState("");
  const [zipCode, setCp] = useState("");
  const [country, setCounrty] = useState("");
  const [id, setId] = useState(0);

  const [lieux, setLieux] = useState([]);

  

  // recupere la liste des tags
  const searchTags = async () => {
    try {
      setTagsList(allLieux.tagListe);
      console.log("All LIEUX +++++" , tagsList);
    } catch (error) {
      // TO DO
    }
  }

  // const searchTags = async () => {
  //   try {
  //     const jsonSearchResultTags= await getTags();
  //     setTagsList(jsonSearchResultTags);
  //     console.log("All LIEUX +++++" , tagsList);
  //   } catch (error) {
  //     // TO DO
  //   }
  // }

  
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
    else{
      sauvegarderLieu();
     
    } 
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
      console.log(tagsSelect)
      for (let value of tagsSelect) {
        listeTags.push(value.item);
      }
      setTagsOk(listeTags);
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
        "latitude": 49.12122366832059, 
        "longitude": 6.164740424626361,
        "country_name": country
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

  useEffect(() => {
    searchTags();
    getId();
    tagsOK();
  }, [lieux, tags]); // quand la liste des lieux change et quand les tags selectionne changent
  

   return (

    <React.Fragment>
      <Layout style={styles.container} level='1'>
        <Input
          style={styles.input}
          placeholder='Nom du lieu'
          onChangeText={(n) => setNom(n)}
        />

        <Input
          style={styles.input}
          accessoryLeft={VilleIcon}
          placeholder='Adresse'
          onChangeText={(a) => setAdresse(a)}
        />
        <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            accessoryLeft={VilleIcon}
            placeholder='Ville'
            onChangeText={(v) => setVille(v)}
          />
          <Input
            style={styles.inputRow}
            placeholder='Code postal'
            onChangeText={(cp) => setCp(cp)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            accessoryLeft={VilleIcon}
            placeholder='Pays'
            onChangeText={(c) => setCounrty(c)}
          />
        </View>
        
        <Input
          style={styles.input}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Description'
          onChangeText={(d) => setDescritpion(d)}
        />

        <View style={styles.rowContainer}>
            <SelectBox
              label="Choisir une catégorie "
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

        <Button onPress={verificationFormulaire}>Ajouter le lieu</Button>

      </Layout>
    </React.Fragment>
            
  );
}

const mapStateToProps = (state) => {
  return {
    allLieux: state
  }
}

export default connect(mapStateToProps)(AddLieu);


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