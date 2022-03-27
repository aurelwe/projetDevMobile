import React, { useState, useEffect } from 'react';
import { Input, Layout, Select, SelectItem, Icon, List, Divider, Button } from '@ui-kitten/components';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Lieu from '../components/Lieu';
import { Picker } from '@react-native-picker/picker';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { connect } from 'react-redux';
import * as Location from 'expo-location';

import DisplayError from '../components/DisplayError';

// permet d'afficher dans le input la valeur choisie dans le select (sinon "Option1")
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
  // filtre
  const [filtre, setFiltre] = useState([]);
  const filtresListe = ["Ne pas filtrer", "Par date d'ajout"];

  const [km, setKm] = useState([]);
  const kmList = ["5 km", "10 km", "20 km", "30 km", "40 km", "+50 km"];

  const [isError, setIsError] = useState(false);

  // recupere les lieux correspondants au terme de recherche
  const searchLieu = async () => {
    try {
      // filtre sur le nom et la ville
      var result = allLieux.ajoutLieuxID.filter(item => item.lieu.name.toLowerCase().includes(searchTermNom.toLowerCase()))
        .filter(item => item.lieu.city.toLowerCase().includes(ville.toLowerCase()));
      // filtre sur les tags si il y en a
      if (tags != "") {
        result = result.filter(item => tags.some(el => item.lieu.tag.includes(el.item)));
      }
      setLieux(result);
    } catch (error) {
      setIsError(true);
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
      setIsError(true);
    }
  }

  // recupere la liste des villes
  const searchVilles = async () => {
    try {
      var listeVilles = [];
      listeVilles.push("");
      // parcours allLieux pour recuperer les villes
      for (let value of allLieux.ajoutLieuxID) {
        listeVilles.push(value.lieu.city);
      }
      // return la liste des villes sans doublons
      const listeVillesSansDoublons = [...new Set(listeVilles)];
      setVillesList(listeVillesSansDoublons);
    } catch (error) {
      setIsError(true);
    }
  }

  // recupere la liste des tags
  const searchTags = async () => {
    try {
      setTagsList(allLieux.tagListe);
    } catch (error) {
      setIsError(true);
    }
  }

  // filtre la liste avec le filtre choisi
  const filtrerPar = async (filtre) => {
    try {
      // row=1 correspond a "par date d'ajout"
      if (filtre.row == 1) {
        // trie en fonction de la date
        const sorted = lieux.sort((a, b) => a.lieu.date_ajout > b.lieu.date_ajout);
        setLieux(sorted);
        setFiltre(filtre);
      }
      else if (filtre.row == 0)// 0="ne pas filtrer"
      {
        searchLieu();
        setFiltre(filtre);
      }
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    searchVilles();
    searchTags();
  }, [allLieux]);

  // icon de recherche
  const SearchIcon = (props) => (
    <Icon {...props} name='search' pack='fontawesome' />
  );

  // pour passer a la page de details d'un lieu
  const navigateToDetailsLieu = (lieuID) => {
    navigation.navigate("Details", { lieuID });
  };

  function onMultiChange() {
    return (item) => setTags(xorBy(tags, [item]));
  }

  return (
    <React.Fragment>
      <Layout style={styles.container} level='1'>
        <FlatList listKey="scroll"
          ListHeaderComponent={
            <>
              <View style={styles.section}>
                <Input
                  style={styles.input}
                  accessoryLeft={SearchIcon}
                  placeholder='Chercher un lieu'
                  onChangeText={(text) => setSearchTermNom(text)}
                  onSubmitEditing={searchLieu}
                />
              </View>
              <View style={styles.section}>
                <Text style={styles.text}>Ville</Text>
                <View style={styles.rowContainer}>
                  <View style={styles.viewPicker}>
                    <Picker
                      selectedValue={ville}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => setVille(itemValue)}
                    >
                      {villeList.map(value =>
                        <Picker.Item key={value} label={value} value={value} />
                      )}
                    </Picker>
                  </View>
                  <Text style={styles.textOu}> Ou </Text>
                  <Button onPress={getAdressPositionActuelle}>Position Actuelle</Button>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <SelectBox
                  label="Choisir une ou plusieurs catégorie(s)"
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
                    <SelectItem title={value} key={value} />
                  )}
                </Select>
              </View>

              <Button onPress={searchLieu}>Rechercher</Button>

              <View style={styles.rowContainer}>
                <Select
                  style={styles.selectRow}
                  selectedIndex={filtre}
                  placeholder="Filtrer par"
                  onSelect={index => filtrerPar(index)}
                  value={getSelectValue(filtre, filtresListe)}>
                  {filtresListe.map((value) =>
                    <SelectItem title={value} key={value} />
                  )}
                </Select>
              </View>


              {
                isError ?
                  (<DisplayError message='Impossible de récupérer les lieux' />) :
                  (<List
                    style={styles.list}
                    ItemSeparatorComponent={Divider}
                    data={lieux}
                    listKey={"liste lieux"}
                    keyExtractor={(item) => item.lieu.id.toString()}
                    renderItem={({ item }) => (
                      <Lieu lieuxData={item} onClick={navigateToDetailsLieu} />
                    )}
                  />)
              }
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
    padding: 10,
  },
  inputRow: {
    margin: 2,
    flex: 1,
  },
  selectRow: {
    margin: 2,
    flex: 1,
  },
  viewPicker: {
    borderWidth: 1,
    borderRadius: 10
  },
  picker: {
    height: 50,
    width: 180,
    borderWidth: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16
  },
  section: {
    paddingBottom: 15
  },
  textOu: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
});