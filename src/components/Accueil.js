import React, { useState, useEffect } from 'react';

import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';


const Accueil = ({route}) => {

  return (
    <View>
       <View >
       <MapView

          style={styles.map}

          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      <View>
        <Text>
          Je suis le composant accueil 
        </Text>
      </View>
    </View>
  )
};

export default Accueil;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});