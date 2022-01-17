import React, { useState } from 'react';
import { Input } from '@ui-kitten/components';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import LieuListItem from './LieuListItem';

// import data from './src/data/data'

// const [searchTerm, setSearchTerm] = useState('');

// const useInputState = (initialValue = '') => {
//     const [value, setValue] = React.useState(initialValue);
//     return { value, onChangeText: setValue };
//   };


const Search = () => {
    
    const [lieux, setLieux] = useState([]);
    // const mediumInputState = useInputState();


    return (
        <Input
            placeholder='Place your Text'
            value={lieux}
            onChangeText={nextValue => setLieux(nextValue)}
      />
                /* <Input
                    placeholder='Tag'
                    style={styles.inputPlaceName}
                    // onChangeText={(text) => setSearchTerm(text)}
                    //   onSubmitEditing={searchRestaurants}
                />
                <Input
                    placeholder='Ville'
                    style={styles.inputPlaceName}
                    // onChangeText={(text) => setSearchTerm(text)}
                    //   onSubmitEditing={searchRestaurants}
                /> */
                /* <Text>Tri :</Text>

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
                /> */

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