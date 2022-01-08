import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, FlatList } from 'react-native';

import Lieu from '../components/Lieu';
import { getLieux } from '../data/RecupereData';


const Carte = ({ navigation }) => {
    
    
   const [lieux, setLieux] = useState([]);


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
    const navigateToDetailsLieu = () => {
        navigation.navigate("ViewDetailsLieu");
      };


  return (
    <View>
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