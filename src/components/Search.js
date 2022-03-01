import React, { useState, useEffect } from 'react';
import { Input, Layout, Select, SelectItem, Icon, List, Divider, Button, IndexPath } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import Lieu from '../components/Lieu';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { connect } from 'react-redux';
import { getVilles } from '../data/RecupereData';
import * as Location from 'expo-location';



function getSelectValue(selectedIndexPaths, options) {
  if (selectedIndexPaths.length) {
    // multiSelect
    return selectedIndexPaths
    .map((indexPath) => options[indexPath.row])
    .join(', ');
  } else {
    // singleSelect
    return options[selectedIndexPaths.row]
  }
}

const Search = ({ navigation, allLieux }) => {
    
    // liste des lieux
    const [lieux, setLieux] = useState([]);
    // terme de recherche  par nom
    const [searchTermNom, setSearchTermNom] = useState('');
    // liste des villes
    const [villeList, setVillesList] = useState([]);
    // ville choisie
    const [ville, setVille] = useState('');
    // liste des tags
    const [tagsList, setTagsList] = useState([]);
    // tags choisis
    const [tags, setTags] = useState([]);

    const [km, setKm] = useState([]);
    const kmList = ["5 km", "10 km", "20 km", "30 km", "40 km", "+50 km"];

    // recupere les lieux correspondants au terme de recherche
    const searchLieu = async () => {
      try {      
        // filtre sur le nom et la ville
        var result = allLieux.ajoutLieuxID.filter(item => item.lieu.name.toLowerCase().includes(searchTermNom.toLowerCase()))
                              .filter(item => item.lieu.city.toLowerCase().includes(ville.toLowerCase()));                      
        // filtre sur les tags si il y en a
        if(tags != ""){
          result = result.filter(item => tags.some(el => item.lieu.tag.includes(el.item)));
        }   
        setLieux(result);
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
        // set la ville pour le select
        setVille(element.city); 
      });
    } catch (error) {
      // TO DO
    }
  }
    
    // recupere la liste des villes
    const searchVilles = async () => {
      try {           
        var listeVilles=[];
        listeVilles.push("Choisir une ville");
        // parcours allLieux pour recuperer les villes
        for (let value of allLieux.ajoutLieuxID) {
          listeVilles.push(value.lieu.city);
        }
        // return la liste des villes sans doublons
        const listeVillesSansDoublons = [...new Set(listeVilles)];
        setVillesList(listeVillesSansDoublons);
      } catch (error) {
        // TO DO
      }
    }

    // recupere la liste des tags
    const searchTags = async () => {
      try {
        setTagsList(allLieux.tagListe);
      } catch (error) {
        // TO DO
      }
    }

    useEffect(() => {
      searchVilles();
      searchTags();
    }, [allLieux]); // Uniquement à l'initialisation

    const SearchIcon = (props) => (
      <Icon {...props} name='search' pack='fontawesome'/>
    );

    const TagsIcon = (props) => (
      <Icon {...props} name='tag' pack='fontawesome'/>
    );

    const VilleIcon = (props) => (
      <Icon {...props} name='pin'/>
    );

     // pour passer a la page de details d'un lieu
    const navigateToDetailsLieu = (lieuID) => {
      navigation.navigate("Details", { lieuID });
    };

    // trie par date la flatlist
    const trierParDate = () => {
      lieux.sort(function(obj1, obj2) {
        // Ascending: first id less than the previous
        console.log("obj====" + JSON.stringify(obj1));
        return obj1.id - obj2.id;
    });
  }

  
  
    function onMultiChange() {
      return (item) => setTags(xorBy(tags, [item]));
    }

    

    return (
      <React.Fragment>
        <Layout style={styles.container} level='1'>
          <Input
            style={styles.input}
            accessoryLeft={SearchIcon}
            placeholder='Chercher un lieu'
            // value={lieux}
            onChangeText={(text) => setSearchTermNom(text)}
          />

          <View>
            <Picker
              selectedValue={ville}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setVille(itemValue)}
            >
              {villeList.map(value=> 
                <Picker.Item key={value} label={value} value={value}/>
              )}
            </Picker>
            <Button onPress={getAdressPositionActuelle}>Position Actuelle</Button>
          </View>

          <View style={styles.rowContainer}>
            <SelectBox
              label="Select tags"
              options={tagsList}
              selectedValues={tags}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
            />
          </View>

          <View style={styles.rowContainer}>
            <Select
              style={styles.selectRow}
              selectedIndex={km}
              placeholder="Rayon"
              onSelect={index => setKm(index)}
              value={getSelectValue(km, kmList)}>
                {kmList.map((value) => 
                  <SelectItem title={value} key={value}/>
                )}          
            </Select>
          </View>

          <Button onPress={searchLieu}>Rechercher</Button>
          {/* <Button onPress={ trierParDate}>Trier par date</Button> */}

          <List
            style={styles.list}
            ItemSeparatorComponent={Divider}
            data={lieux}
            keyExtractor={(item) => item.lieu.id.toString()}
            renderItem={({ item }) => (
            <Lieu lieuxData={item} onClick={navigateToDetailsLieu} />
            )}
          />

        </Layout>
      </React.Fragment>
    );
}

const mapStateToProps = (state) => {
  return {
    allLieux: state
  }
}

export default connect(mapStateToProps)(Search);

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