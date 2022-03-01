import React from 'react';
import { ListItem, Text, Button } from '@ui-kitten/components';
import { TouchableOpacity,View, StyleSheet, Image } from 'react-native';
import Assets from '../definitions/Assets';

const Lieu = ({onClick, lieuxData }) => {

  // const renderItemAccessory = (props) => (
  //   // <Text size='s1'>{tag}</Text>
  // );

  // recupere les lieux correspondants au terme de recherche
  const imagesTags = () => {
    try {
      if(lieuxData.lieu.tag.includes("Visiter")){
        return (
        <Image style={styles.icon} source={Assets.icons.visiter} />
        )
      } 
      if(lieuxData.lieu.tag.includes("Manger")){
        return (
        <Image style={styles.icon} source={Assets.icons.manger} />
        )
      }
      if(lieuxData.lieu.tag.includes("Boire un coup")){
        return (
        <Image style={styles.icon} source={Assets.icons.boire} />
        )
      }   
    } catch (error) {
      // TO DO
    }
  }
   
  return ( //Chaque éléments de la flatlist dans carte
    <TouchableOpacity style={styles.container} onPress={() => { onClick(lieuxData.lieu.id) }}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {lieuxData.lieu.name}
          </Text>
          <View>{imagesTags()}</View>          
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