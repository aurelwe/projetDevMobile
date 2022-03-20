import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator , Share, Image, Dimensions, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Layout, Text, Button } from '@ui-kitten/components';
import Assets from '../definitions/Assets';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import Communications from 'react-native-communications';

const DetailsLieu = ({ route, navigation, allLieux, dispatch }) => {

  const [lieuDetails, setLieu] = useState([]);
  const [coordMap, setCoordMap] = useState(null);
  const [isError, setIsError] = useState(false);

    // remplace les noms des tags par des images 
    const imagesTags = () => {
      var img = [];
      try {
        // parcours les lieux avec l'id du lieu choisis et recupere les tags
        const lieuId = allLieux.ajoutLieuxID.filter(item => item.lieu.id == route.params.lieuID);
        const mapLieu = lieuId.map(element => element.lieu.tag);
        // set la variable lieuDetails 
        mapLieu.forEach(function (lieu) {
          if(lieu.includes("Visiter")){
            // on ajoute l'image de visiter a la liste
            img.push(<View key={1}><Image style={styles.icon} source={Assets.icons.visiter} /></View>);
          } 
          if(lieu.includes("Manger")){
            img.push(<View key={2}><Image style={styles.icon} source={Assets.icons.manger} /></View>);
          }
          if(lieu.includes("Boire un coup")){
            img.push(<View key={3}><Image style={styles.icon} source={Assets.icons.boire} /></View>);
          }  
        }); 
        return (img);
      } catch (error) {
        // TO DO
      }
    }

  // recupere les details du lieu correspondant
  const requestLieu =  () => {
    try {
      // filtre par rapport a l'id du lieu
      const lieuId = allLieux.ajoutLieuxID.filter(item => item.lieu.id == route.params.lieuID);
      const mapLieu = lieuId.map(element => element.lieu);
      // set la variable lieuDetails 
      mapLieu.forEach(function (lieu) {
        setLieu(lieu);
        setCoordMap({
          latitude: lieu.latitude,
          longitude: lieu.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      });
      console.log("lieu details ===" + JSON.stringify(lieuDetails))
      
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
  },[lieuDetails]);

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
              {               
              <MapView style={styles.map}  
              initialRegion={coordMap} 
              >
                { lieuDetails.latitude != null && lieuDetails.longitude != null ?  
                <Marker
                  key={lieuDetails.id}
                  pinColor={"blue"}
                  coordinate= {{latitude: lieuDetails.latitude, longitude: lieuDetails.longitude}}
                  title={lieuDetails.name}
                />  
                : null }
              </MapView> }
              

                <View>
                  <Text>
                    {lieuDetails.name}
                  </Text>
                </View>
                  <Text>
                    {lieuDetails.address}
                  </Text> 
                  <Text>
                    {lieuDetails.zipcode}{lieuDetails.city}
                  </Text>
                  <Text>
                    {lieuDetails.country_name}
                  </Text>
                  { lieuDetails.telephone != ""  ? 
                    <TouchableOpacity onPress={() => Communications.phonecall(lieuDetails.telephone, true)}>
                      <View>
                        <Text>Appeler ce lieu</Text>
                      </View>
                    </TouchableOpacity> 
                : null }
                { lieuDetails.site != ""  ? 
                <TouchableOpacity onPress={() => Communications.web(lieuDetails.site)}>
                  <View style={styles.holder}>
                    <Text style={styles.text}>Ouvrir le site internet de {lieuDetails.name}</Text>
                  </View>
                </TouchableOpacity>
                : null }                
                <Text>
                  {lieuDetails.description}
                </Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  {imagesTags()}
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
    
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
