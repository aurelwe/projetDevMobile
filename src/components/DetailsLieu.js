import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { getLieuDetails } from '../data/RecupereData';
import { Layout, Text } from '@ui-kitten/components';

// function tagIcons(tags){
//   const icons = []
//   for (let i = 0; i<= tags.size; i++) {
//     if (tags[i] === "Boire un coup"){
//      icons[i].push(<Icon name='cocktail' pack='fontawesome'/>)
//     }
//     if (tags[i] === "Manger"){
//       icons[i].push(<Icon name='utensils' pack='fontawesome'/>)
//     }
//     if (tags[i] === "Visiter"){
//       icons[i].push(<Icon name='camera' pack='fontawesome'/>)
//     }
//   }
//   return icons
// }

const DetailsLieu = ({ route }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [lieu, setLieu] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestLieu();
  }, []); // Uniquement à l'initialisation

  const requestLieu = async () => {
    try {
      const jsonLieuResult = await getLieuDetails(route.params.lieuID);
      setLieu(jsonLieuResult);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }
  // const tags = []
  // for (let i = 0; i<= lieu.tag.size; i++) {
  //   if (tags[i] === "Boire un coup"){
  //     tags.push(<Icon name='cocktail' pack='fontawesome'/>)
  //   }
  //   if (tags[i] === "Manger"){
  //     tapGestureHandlerProps.push(<Icon name='utensils' pack='fontawesome'/>)
  //   }
  //   if (tags[i] === "Visiter"){
  //     tags.push(<Icon name='camera' pack='fontawesome'/>)
  //   }
  // }


  const MangerIcon = (props) => (
    <Icon {...props} name='utensils' pack='fontawesome'/>
  );

  const DrinkIcon = (props) => (
    <Icon {...props} name='cocktail' pack='fontawesome'/>
  );

  const VisitIcon = (props) => (
    <Icon {...props} name='camera' pack='fontawesome'/>
  );


  return (
    <Layout style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?   
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>
          ) : (
              <React.Fragment>
                <View style={styles.location}>
                  <Text>
                    {lieu.location.address}
                  </Text>
                  <Text>
                    {lieu.location.city}
                  </Text>
                  <Text>
                    {lieu.location.zip}
                  </Text>
                </View>
                <Text>
                  {lieu.description}
                </Text>

                <View style={styles.tag}>
                  {/* {lieu.tag.map((item) => (
                    tagIcons(item)
                  ))} */}
                  <Text>{lieu.tag}</Text>
                </View>
              </React.Fragment>
            )
        )
      }
    </Layout>
  );
};

export default DetailsLieu;

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    flex:1,
    paddingHorizontal: 12, 
  },
  tag: {
    
  }
});