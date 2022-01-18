import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';

import Lieu from '../components/Lieu';
import { getLieux } from '../data/RecupereData';


const Carte = ({ navigation }) => {
  // liste de lieux
  const [lieux, setLieux] = useState([]);

  // recherche tous les lieux enregistrés
  const searchLieux = async () => {
      try {
        const dataSearchResult = await getLieux();
        setLieux(dataSearchResult.lieux);
      } catch (error) {
  
      }
    }

    // affiche les lieux a l'initialisation de la page
    useEffect(() => {
        searchLieux();
    }, []);

    // pour passer a la page de details d'un lieu
    const navigateToDetailsLieu = (lieuID) => {
      navigation.navigate("ViewDetailsLieu", { lieuID });
    };

  return (
    <View style={styles.container}>

      <View >
        <MapView style={styles.map}>

        <Marker
          coordinate= {{latitude: 48.270321, longitude: 7.441033,}}
          title={"marker.title"}
          description= {"lolz"}
        />   
        </MapView>

      </View>

      <View>
        <FlatList
            data={lieux}
            keyExtractor={(item) => item.lieu.id.toString()}
            renderItem={({ item }) => (
            <Lieu lieuxData={item.lieu} onClick={navigateToDetailsLieu} />
            )}
        />
      </View>
    </View>
  );
};

export default Carte;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

