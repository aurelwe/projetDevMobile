import React from 'react';
import { ListItem, Text, Button  } from '@ui-kitten/components';
import { TouchableOpacity,View, StyleSheet } from 'react-native';
//LIEU EST DANS LA FLATLIST, UTILISE POUR AVOIR LA LISTE DES LIEUX

const Lieu = ({onClick, lieuxData }) => {

  // const renderItemAccessory = (props) => (
  //   // <Text size='s1'>{tag}</Text>
  // );
   
  return ( //Chaque éléments de la flatlist dans carte
    <TouchableOpacity style={styles.container} onPress={() => { onClick(lieuxData.lieu.id) }}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {lieuxData.lieu.name}
          </Text>
          
          {/* <Button>
            Centrer
          </Button> */}
        </View>
      </View>
    </TouchableOpacity>

  );
};

export default Lieu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});