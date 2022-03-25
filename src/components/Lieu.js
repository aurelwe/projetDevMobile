import React from 'react';
import { ListItem, Text, Button } from '@ui-kitten/components';
import { TouchableOpacity,View, StyleSheet, Image } from 'react-native';
import Assets from '../definitions/Assets';

const Lieu = ({onClick, lieuxData, isAvisiter = false, isDejaVisiter=false }) => {

  // recupere les lieux correspondants au terme de recherche
  const imagesTags = () => {
    var img = [];
    try {
      // si le tag = visiter
      if(lieuxData.lieu.tag.includes("Visiter")){
        // on ajoute l'image de visiter a la liste
        img.push(<View key={1}><Image style={styles.icon} source={Assets.icons.visiter} /></View>);
      } 
      if(lieuxData.lieu.tag.includes("Manger")){
        img.push(<View key={2}><Image style={styles.icon} source={Assets.icons.manger} /></View>);
      }
      if(lieuxData.lieu.tag.includes("Boire un coup")){
        img.push(<View key={3}><Image style={styles.icon} source={Assets.icons.boire} /></View>);
      }   
      return (img);
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
          <View style={{flexDirection:'row', marginLeft: 'auto', paddingRight: 12}}>
            {imagesTags()}
          </View>        
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