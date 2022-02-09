import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Alert } from 'react-native';
import { Input, Layout, Icon, Button } from '@ui-kitten/components';
import { addLieu, getTags } from '../data/RecupereData';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import Toast from 'react-native-root-toast';

const AddLieu  = () => {


  const [tags, setTags] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [name, setNom] = useState("");
  const [adress, setAdresse] = useState("");
  const [description, setDescritpion] = useState("");
  const [note, setNote] = useState([]);
  const [city, setVille] = useState("");
  const [zipCode, setCp] = useState("");
  const [country, setCounrty] = useState("");
  const [id, setId] = useState("5");

  // recupere la liste des tags
  const searchTags = async () => {
    try {
      const jsonSearchResultTags= await getTags();
      setTagsList(jsonSearchResultTags);
    } catch (error) {
      // TO DO
    }
  }

  
  // ajoute le nouveau lieu
  const addNewLieu = () => {

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
      setId(id+1);
      addLieu(id, name, description, adress, city, zipCode, country, tags);
      let toast = Toast.show('Restaurant ajouté aux favoris', {
        duration: Toast.durations.LONG,
      });
    } 
  }

  useEffect(() => {
    searchTags();
  }, []); // Uniquement à l'initialisation

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
           <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            placeholder='Note'
            accessoryLeft={NoteIcon}
            onChangeText={(rate) => setNote(rate)}
          />
        </View>
        <Button onPress={addNewLieu}>Ajouter</Button>

      </Layout>
    </React.Fragment>
            
  );
}


export default AddLieu;

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