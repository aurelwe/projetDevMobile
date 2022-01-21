import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableHighlightBase } from 'react-native';
import * as Location from 'expo-location';
import { useIsFocused } from '@react-navigation/native';

import Lieu from '../components/Lieu';
import { getLieux } from '../data/RecupereData';


const Carte = ({ navigation }) => {
  // liste de lieux
  const [lieux, setLieux] = useState([]);
  
  // position actuelle de l'utilisateur
  const [positionActuelle, setPosition] = useState(null);
  
  // test au changement de page
  const isFocused = useIsFocused();

  // recherche tous les lieux enregistrés
  const searchLieux = async () => {
      try {
        const dataSearchResult = await getLieux();
        setLieux(dataSearchResult.lieux);
        console.log("search lieu Carte ===" + JSON.stringify(lieux));
      } catch (error) {
  
      }
    }
  
  // recupere la position actuelle de l'utilisateur
  const getPositionActuelle = async () => {
    try {
      const positionActuelleUser = await Location.getCurrentPositionAsync({});
      setPosition({
        latitude: positionActuelleUser.coords.latitude,
        longitude: positionActuelleUser.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {

    }
  }

  // initialisation de la page
  useEffect(() => {
      searchLieux();
      getPositionActuelle();
  },[isFocused]);

  // pour passer a la page de details d'un lieu
  const navigateToDetailsLieu = (lieuID) => {
    navigation.navigate("ViewDetailsLieu", { lieuID });
  };

  return (
    <View style={styles.container}>

      <View>
        <MapView style={styles.map}  
         initialRegion={positionActuelle} 
        >
          {lieux.map((listeLieux) => (   
            <Marker
              key={listeLieux.lieu.id}
              coordinate= {{latitude: listeLieux.lieu.location.latitude, longitude: listeLieux.lieu.location.longitude}}
              title={listeLieux.lieu.name}
            />           
          ))}
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

