import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Text } from '@ui-kitten/components';
//LIEU EST DANS LA FLATLIST, UTILISE POUR AVOIR LA LISTE DES LIEUX

const Lieu = ({onClick, lieuxData, lieuxData: { location }, lieuxData: { tag }}) => {

  const renderItemAccessory = (props) => (
    <Text size='s1'>{lieuxData.tag}</Text>
  );
  return ( //Chaque éléments de la flatlist dans carte
    <ListItem 
      title={lieuxData.name}
      description={location.city}
      accessoryRight={renderItemAccessory}
      onPress={() => { onClick(lieuxData.id) }}
    />    
  );
};

export default Lieu;