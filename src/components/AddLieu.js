import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';



const AddLieu = () => {
    const [lieux, setLieux] = useState([]);


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