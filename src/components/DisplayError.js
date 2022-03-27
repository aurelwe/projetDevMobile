import React from 'react';
import { View, StyleSheet, Text, Icon } from 'react-native';



const DisplayError = ({ message = "Une erreur s'est produite" }) => (
  <View style={styles.container}>
    <Icon name='exclamation' pack='fontawesome' />
    <Text style={styles.errorText}>
      {message}
    </Text>
  </View>
);

export default DisplayError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});