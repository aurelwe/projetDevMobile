import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Layout, List, Divider, TopNavigationAction, TopNavigation, Icon, Button } from '@ui-kitten/components';
import Lieu from '../components/Lieu';
import { getPositionActuelle } from '../data/RecupereData';
import { connect } from 'react-redux';


const Carte = ({ navigation, allLieux }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Carte',
      headerRight: () => (
        <Icon name='plus' type='font-awesome' onPress={navigateToAddLieu} />
      ),
    });
  }, [navigation]);

  // liste de lieux pour afficher les markers
  const [lieux, setLieux] = useState([]);
  // permet de récupérer les coordonnées de la map qui est affichée
  const [mapRef, updateMapRef] = useState(null);
  // position actuelle de l'utilisateur
  const [positionActuelle, setPosition] = useState(null);
  // position du lieu a centrer
  const [positionAcentrer, setPositionAcentrer] = useState(null);
  // rafraichir la page
  // const [isRefreshing, setIsRefreshing] = useState(false);

  // recherche tous les lieux enregistrés
  // const searchLieux = async () => {
  //   setIsRefreshing(true);
  //   try {
  //     setLieux(allLieux);
  //     console.log("SET LIEUX CARTE ====" + JSON.stringify(lieux));
  //   } catch (error) {
  //     // TO DO
  //   }
  //   setIsRefreshing(false);
  // }

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
      // TO DO
      console.log(error);
    }
  }

  // recupere la position du lieu a centrer
  const setPositionLieuCentrer = (latitude, longitude) => {
    try {
      setPositionAcentrer({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922 * 0.05,
        longitudeDelta: 0.0421 * 0.05,
      });
    } catch (error) {
      //TO DO
      console.log(error);
    }
  }

  // regarde si un lieu est dans la map et si oui l'ajoute à la liste
  const onRegionChange = async (region) => {
    const mapLieu = allLieux.map(element => element);
    console.log(JSON.stringify(mapLieu))
    // liste qui va contenir les lieux affichés sur la map
    const list = [];
    if (mapRef === null) {
      return;
    }
    let coordsBoundaries = await mapRef.getMapBoundaries();
    let southWest = coordsBoundaries.southWest;
    let northEast = coordsBoundaries.northEast;
    // nord ouest
    let northWestLong = coordsBoundaries.northEast.longitude - region.longitudeDelta;
    let northWestLat = coordsBoundaries.northEast.latitude;
    // sud est
    let southEastLong = coordsBoundaries.southWest.longitude + region.longitudeDelta;
    let southEastLat = coordsBoundaries.southWest.latitude;

    mapLieu.forEach(function (lieu) {
      // vérifie que les coordonnées du lieu sont bien compris dans ceux de la map
      if ((lieu.lieu.latitude < northEast.latitude) && (lieu.lieu.latitude > southWest.latitude) && (lieu.lieu.longitude > southWest.longitude)
        && (lieu.lieu.longitude < northEast.longitude)) {
        list.push(lieu);
      }
    });
    // met a jour la liste des lieux contenus sur la map
    setLieux(list);
    // enleve la region associée à la map afin de pouvoir rebouger sur la map
    setPositionAcentrer(null);
  }

  useEffect(() => {
    getPosition();
  }, [allLieux]);

  const AddIcon = (props) => (
    <Icon {...props} name='plus' pack='fontawesome' />
  );

  const CentrerIcon = (props) => (
    <Icon {...props} name='crosshairs' pack='fontawesome' />
  );

  // pour passer a la page de details d'un lieu
  const navigateToDetailsLieu = (lieuID) => {
    navigation.navigate("Details", { lieuID });
  };

  // pour passer a la page d'ajout d'un lieu
  const navigateToAddLieu = () => {
    navigation.navigate("Nouveau lieu");
  };

  const renderAddAction = () => (
    <TopNavigationAction icon={AddIcon} />
  );

  return (
    <Layout style={styles.container}>

      <TopNavigation onTouchEnd={navigateToAddLieu} accessoryRight={renderAddAction} />

      <MapView style={styles.map}
        initialRegion={positionActuelle}
        ref={(ref) => updateMapRef(ref)}
        onRegionChangeComplete={(coordonneesDeplacement) => onRegionChange(coordonneesDeplacement)}
        region={positionAcentrer}
        
      >
        {lieux.map((listeLieux) => (
          <Marker
            key={listeLieux.lieu.id}
            pinColor={"blue"}
            coordinate={{ latitude: listeLieux.lieu.latitude, longitude: listeLieux.lieu.longitude }}
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
          <View>
            <Lieu lieuxData={item} onClick={navigateToDetailsLieu} />
            <Button
              style={styles.centrerBtn}
              onPress={() => setPositionLieuCentrer(item.lieu.latitude, item.lieu.longitude)}
              accessoryLeft={CentrerIcon}>
            </Button>
          </View>

        )}
        // refreshing={isRefreshing}
        // onRefresh={searchLieux}
      />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    allLieux: state.allLieuxReducer.ajoutLieuxID
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
  },
  centrerBtn: {
    width: 40,
    marginLeft: 'auto',
    marginRight: 20
  }
});

