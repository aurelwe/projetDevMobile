import React, { useState } from 'react';
import { Input, Layout, Select, SelectItem, Icon } from '@ui-kitten/components';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import LieuListItem from './LieuListItem';

// import data from './src/data/data'

// const [searchTerm, setSearchTerm] = useState('');

// const useInputState = (initialValue = '') => {
//     const [value, setValue] = React.useState(initialValue);
//     return { value, onChangeText: setValue };
//   };


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



const Search = () => {
    
    const [lieux, setLieux] = useState([]);
    const [ville, setVille] = useState([]);
    const [tags, setTags] = useState([]);
    const tagsList = ["Boire", "Manger", "Visiter"]
    const [km, setKm] = useState([]);
    const kmList = ["5 km", "10 km", "20 km", "30 km", "40 km", "+50 km"]

    const SearchIcon = (props) => (
      <Icon {...props} name='search-outline'/>
    );

    const TagsIcon = (props) => (
      <Icon {...props} name='pricetags-outline'/>
    );

    const VilleIcon = (props) => (
      <Icon {...props} name='pin-outline'/>
    );

    return (
      <React.Fragment>
        <Layout style={styles.container} level='1'>
          <Input
            style={styles.input}
            accessoryLeft={SearchIcon}
            placeholder='Chercher un lieu'
            value={lieux}
            onChangeText={nextValue => setLieux(nextValue)}
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
              value={ville}
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
        </Layout>
      </React.Fragment>
    );
}


export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
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