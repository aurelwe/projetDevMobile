import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator , Share} from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

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

const DetailsLieu = ({ route, navigation, allLieux, dispatch }) => {

  const [lieuDetails, setLieu] = useState([]);
  const [isError, setIsError] = useState(false);

  // recupere les details du lieu correspondant
  const requestLieu =  async () => {
    try {
      // filtre par rapport a l'id du lieu
      const lieuId = allLieux.ajoutLieuxID.filter(item => item.lieu.id == route.params.lieuID);
      const mapLieu = lieuId.map(element => element.lieu);
      // set la variable lieuDetails 
      mapLieu.forEach(function (lieu) {
        setLieu(lieu);
      });
    } catch (error) {
        setIsError(true); 
    }
  }

  // partage l'adresse du lieu 
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: lieuDetails.address + " " + lieuDetails.zipcode + " " +lieuDetails.city + " " + lieuDetails.country_name
      });
    } catch (error) {
      alert(error.message);
    }
  };
  
  useEffect(() => {
    requestLieu();
  },[allLieux]); // Uniquement à l'initialisation

  const MangerIcon = (props) => (
    <Icon {...props} name='utensils' pack='fontawesome'/>
  );

  const DrinkIcon = (props) => (
    <Icon {...props} name='cocktail' pack='fontawesome'/>
  );

  const VisitIcon = (props) => (
    <Icon {...props} name='camera' pack='fontawesome'/>
  );

  // supprimer un lieu
  const supprimerLieu = () => {
    // deleteLieu(route.params.lieuID);
    navigateToCarte();
  }

  // pour passer a la carte apres la suppression
  const navigateToCarte = () => {
    navigation.navigate("Carte");
  };

    // On pourrait définir les actions dans un fichier à part
    const saveLieu = async () => {
      const action = { type: 'ADD_LIEUX', value: route.params.lieuID };
      dispatch(action);
      let toast = Toast.show('lieu ajouté ', {
        duration: Toast.durations.LONG,
      });
    }
  
  const deleteLieu = async () => {
    const action = { type: 'DELETE_LIEU', value: route.params.lieuID };
    dispatch(action);
    navigateToCarte();
    let toast = Toast.show('Le lieu est supprimé', {
      duration: Toast.durations.LONG,
      });
  }

  const navigateToEditLieu = (lieuID) => {
    console.log(lieuID);
    navigation.navigate("Edit lieu", {lieuID});
  };


  return (
    <Layout style={styles.container}>
      {
        (
              <React.Fragment>
                <View>
                  <Text>
                    {lieuDetails.name}
                  </Text>
                </View>
                <View>
                  <Text>
                    {lieuDetails.address}
                  </Text> 
                  <Text>
                    {lieuDetails.zipcode}{lieuDetails.city}
                  </Text>
                  <Text>
                    {lieuDetails.country_name}
                  </Text>
                </View>
                <Text>
                  {lieuDetails.description}
                </Text>

                <View style={styles.tag}>
                  <Text>{lieuDetails.tag}</Text>
                </View>
                <Button onPress={deleteLieu}>Supprimer</Button>
                <Button onPress={() => navigateToEditLieu(lieuDetails.id)}>Modifier</Button>
                <Button onPress={onShare}>Partager le lieu</Button>

              </React.Fragment>
            )
        
      }
    </Layout> 
  );
};

const mapStateToProps = (state) => {
  return {
    allLieux: state
  }
}

export default connect(mapStateToProps)(DetailsLieu);


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