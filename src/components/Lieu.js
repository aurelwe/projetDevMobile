import React from 'react';
import { ListItem, Text } from '@ui-kitten/components';
//LIEU EST DANS LA FLATLIST, UTILISE POUR AVOIR LA LISTE DES LIEUX

const Lieu = ({onClick, lieuxData, lieuxData: { location }, lieuxData: { tag }}) => {

  const renderItemAccessory = (props) => (
    <Text size='s1'>{tag}</Text>
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