import React, { useState } from 'react';
import { Input, Layout, Select, SelectItem, Icon, List, Divider, Button } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import Lieu from '../components/Lieu';
import { getLieux } from '../data/RecupereData';


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

const Search = ({ navigation }) => {
    
    // liste des lieux
    const [lieux, setLieux] = useState([]);
    // terme de recherche
    const [searchTerm, setSearchTerm] = useState('');

    const [ville, setVille] = useState([]);
    const [tags, setTags] = useState([]);
    const tagsList = ["Boire", "Manger", "Visiter"];
    const [km, setKm] = useState([]);
    const kmList = ["5 km", "10 km", "20 km", "30 km", "40 km", "+50 km"];

    // recupere les lieux correspondants au terme de recherhce
    const searchLieu = async () => {
      try {
        const jsonSearchResult = await getLieux(searchTerm);
        setLieux(jsonSearchResult);
      } catch (error) {
        // TO DO
      }
    }

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

    return (
      <React.Fragment>
        <Layout style={styles.container} level='1'>
          <Input
            style={styles.input}
            accessoryLeft={SearchIcon}
            placeholder='Chercher un lieu'
            // value={lieux}
            onChangeText={(text) => setSearchTerm(text)}
          />

          <Select
            style={styles.select}
            accessoryLeft={TagsIcon}
            multiSelect={true}
            placeholder="Tags"
            selectedIndex={tags}
            onSelect={index => setTags(index)}
            value={getSelectValue(tags, tagsList)}>
              {tagsList.map((value) => 
                <SelectItem title={value} key={value}/>
              )}          
          </Select>       

          <View style={styles.rowContainer}>
            <Input
              style={styles.inputRow}
              accessoryLeft={VilleIcon}
              placeholder='Ville'
              // value={ville}
              onChangeText={nextValue => setVille(nextValue)}
            />

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

          <List
            style={styles.list}
            ItemSeparatorComponent={Divider}
            data={lieux}
            keyExtractor={(item) => item.lieu.id.toString()}
            renderItem={({ item }) => (
            <Lieu lieuxData={item.lieu} onClick={navigateToDetailsLieu} />
            )}
          />

        </Layout>
      </React.Fragment>
    );
}


export default Search;

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