import React, { useState, useEffect, Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const Accueil = ({route}) => {

  let location = {
    latitude: 23.256677,
    longitude: 55.887766,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009, 
  }
  return (
    <View>
       <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    </View>
    
      
  )
};

export default Accueil;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});