import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

import JSONDATA from '../data/data.json';


const AddLieu = () => {
    const [lieux, setLieux] = useState([]);
    
  const newLieu = async () => {
    
  //   const data = fs.readFileSync('../data/data.json');
  //   const myObject= JSON.parse(data);

  //   const newData = {
  //     "country": "England"
  // } 
  // myObject.push(newData);
  // var newDataa = JSON.stringify(myObject);
  // fs.writeFile('data.json', newDataa, err => {
  //     // error checking
  //     if(err) throw err;
      
  //     console.log("New data added");
  // }); 
}

useEffect(() => {
  newLieu();
})


   

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder='Nom du lieu'
                style={styles.inputPlaceName}
                // onChangeText={(text) => setSearchTerm(text)}
                //   onSubmitEditing={searchRestaurants}
            />
            <TextInput
                multiline
                numberOfLines={10}
                placeholder='Description'
                style={styles.textArea}
                // onChangeText={(text) => setSearchTerm(text)}
                //   onSubmitEditing={searchRestaurants}
            />
            <TextInput
                placeholder='Tag'
                style={styles.inputPlaceName}
                // onChangeText={(text) => setSearchTerm(text)}
                //   onSubmitEditing={searchRestaurants}
            />
            <TextInput
                placeholder='Adresse'
                style={styles.inputPlaceName}
                // onChangeText={(text) => setSearchTerm(text)}
                //   onSubmitEditing={searchRestaurants}
            />
            <TextInput
                placeholder='Note'
                style={styles.inputPlaceName}
                // onChangeText={(text) => setSearchTerm(text)}
                //   onSubmitEditing={searchRestaurants}
            />
        </SafeAreaView>
    );
}


export default AddLieu;

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
  textArea: {
    borderWidth: 1,
    marginBottom: 8,
    padding: 10,
    justifyContent: 'flex-start',
  },
});