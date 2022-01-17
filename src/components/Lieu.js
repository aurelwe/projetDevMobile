import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

//LIEU EST DANS LA FLATLIST, UTILISE POUR AVOIR LA LISTE DES LIEUX
const Lieu = ({onClick, lieuxData, lieuxData: { location }, lieuxData: { tag }}) => {

  return (
    <TouchableOpacity onPress={onClick}>
      <View>
        <View>
          <Text>
            {lieuxData.name}
          </Text>
        </View>
        <View>
          <Text>
            {lieuxData.description}
          </Text>
        </View>
        <View>
          <Text>
            {location.city}
          </Text>
        </View>
        <View>
          <Text>
            {tag}
          </Text>
        </View>
    </View>
    </TouchableOpacity>
  );
};

export default Lieu;
