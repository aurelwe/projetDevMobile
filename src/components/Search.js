import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import LieuListItem from './LieuListItem';

// import data from './src/data/data'

// const [searchTerm, setSearchTerm] = useState('');



const Search = () => {
    const [lieux, setLieux] = useState([]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Nom du lieu'
                    style={styles.inputPlaceName}
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
                    placeholder='Ville'
                    style={styles.inputPlaceName}
                    // onChangeText={(text) => setSearchTerm(text)}
                    //   onSubmitEditing={searchRestaurants}
                />
                <Text>Tri :</Text>
                <FlatList
                    data={lieux}
                    keyExtractor={(item) => item.lieu.id.toString()}
                    renderItem={({ item }) => (
                    <LieuListItem
                        LieuData={item.lieu}
                        // onClick={navigateToRestaurantDetails}
                        // isFav={amIaFavRestaurant(item.restaurant.id)} 
                    />
                    )}
                    // onEndReached={loadMoreRestaurants}
                    // onEndReachedThreshold={0.5}
                    // refreshing={isRefreshing}
                    // onRefresh={searchRestaurants}
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