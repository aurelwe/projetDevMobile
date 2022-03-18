import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {Layout, List, Divider, TopNavigationAction, TopNavigation, Icon  } from '@ui-kitten/components';

import Lieu from '../components/Lieu';
import { getPositionActuelle } from '../data/RecupereData';
import { connect, useSelector } from 'react-redux';


const Carte = ({ navigation, allLieux }) => {
  // liste de lieux
  const [lieux, setLieux] = useState([]);
  
  // position actuelle de l'utilisateur
  const [positionActuelle, setPosition] = useState(null);

  // position actuelle de l'utilisateur
  const [colorMarquer, setColor] = useState('red');

  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // test au changement de page
  const isFocused = useIsFocused();

  // recherche tous les lieux enregistrés
  const searchLieux = async () => {
    setIsRefreshing(true);
      try {
        setLieux(allLieux);
        console.log("SET LIEUX CARTE ===="+  JSON.stringify(lieux));
      } catch (error) {
        // TO DO
      }
      setIsRefreshing(false);
    }
    
  // recupere la position actuelle de l'utilisateur
  const getPosition = async () => {
    try {
      const dataSearchResultPosition = await getPositionActuelle();
      setPosition({
              latitude: dataSearchResultPosition.coords.latitude,
              longitude: dataSearchResultPosition.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
    } catch (error) {

    }
  }  

  const amIaFavRestaurant = (lieuID) => {
    if (allLieux.findIndex(i => i === lieuID) !== -1) {
      return true;
    }
    return false;
  };

  // initialisation de la page
  useEffect(() => {
      searchLieux();
      getPosition();
  },[allLieux]);

  const AddIcon = (props) => (
    <Icon {...props} name='plus' pack='fontawesome'/>
  );

  // pour passer a la page de details d'un lieu
  const navigateToDetailsLieu = (lieuID) => {
    navigation.navigate("Details", {lieuID});
  };

  const navigateToAddLieu = () => {
    navigation.navigate("Nouveau lieu");
  };

  const renderAddAction = () => (
    <TopNavigationAction icon={AddIcon}/>
  );

  return (
    <Layout style={styles.container}>

      <TopNavigation onTouchEnd={navigateToAddLieu} accessoryRight={renderAddAction}/>

        <MapView style={styles.map}  
         initialRegion={positionActuelle} 
         onRegionChangeComplete={(coordonneesDeplacement)=>{console.log(coordonneesDeplacement); }}
        >
          {lieux.map((listeLieux) => (   
            <Marker
              key={listeLieux.lieu.id}
              pinColor={"blue"}
              coordinate= {{latitude: listeLieux.lieu.latitude, longitude: listeLieux.lieu.longitude}}
              title={listeLieux.lieu.name}
            />           
          ))}
        </MapView>

        <List
            style={styles.list}
            ItemSeparatorComponent={Divider}
            data={lieux}
            keyExtractor={(item) => item.lieu.id.toString()}
            renderItem={({ item }) => (
              // console.log("ITEM ="+ JSON.stringify(item))
              <Lieu lieuxData={item} onClick={navigateToDetailsLieu} />
            )}           
            refreshing={isRefreshing}
            onRefresh={searchLieux}
        />
     </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    allLieux: state.ajoutLieuxID
  }
}

export default connect(mapStateToProps)(Carte);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 7,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  list: {
    flex: 1,
  }
});

