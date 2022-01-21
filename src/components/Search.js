import React, { useState, useEffect } from 'react';
import { Input } from '@ui-kitten/components';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

import Lieu from '../components/Lieu';
import { getSearchLieu } from '../data/RecupereData';


const Search = ({ navigation }) => {
    
    // liste des lieux
    const [lieux, setLieux] = useState([]);
    // terme de recherche
    const [searchTerm, setSearchTerm] = useState('');
  
    // recupere les lieux correspondants au terme de recherhce
    const searchLieu = async () => {
      try {
        const jsonSearchResult = await getSearchLieu(searchTerm);
        setLieux(jsonSearchResult);
      } catch (error) {
  
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder='Nom du lieu'
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Button
            title='Rechercher'
            onPress={searchLieu}
          />
        </View>

        <View>
          <FlatList
            data={lieux}
            keyExtractor={(item) => item.lieu.id.toString()}
            renderItem={({ item }) => (
              <Lieu lieuxData={item.lieu}/>
            )}
          />
        </View>
      </View>
    );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputPlaceName: {
    marginBottom: 8,
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
});