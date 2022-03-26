import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Share, Image, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import Assets from '../definitions/Assets';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import Communications from 'react-native-communications';

const DetailsLieu = ({ route, navigation, allLieux, listeVisites, listeDejaVisites, dispatch }) => {

  const [lieuDetails, setLieu] = useState([]);
  const [coordMap, setCoordMap] = useState(null);

  // remplace les noms des tags par des images 
  const imagesTags = () => {
    var img = [];
    try {
      // parcours les lieux avec l'id du lieu choisis et recupere les tags
      const lieuId = allLieux.ajoutLieuxID.filter(item => item.lieu.id == route.params.lieuID);
      const mapLieu = lieuId.map(element => element.lieu.tag);
      // set la variable lieuDetails 
      mapLieu.forEach(function (lieu) {
        if (lieu.includes("Visiter")) {
          // on ajoute l'image de visiter a la liste
          img.push(<View key={1}><Image style={styles.icon} source={Assets.icons.visiter} /></View>);
        }
        if (lieu.includes("Manger")) {
          img.push(<View key={2}><Image style={styles.icon} source={Assets.icons.manger} /></View>);
        }
        if (lieu.includes("Boire un coup")) {
          img.push(<View key={3}><Image style={styles.icon} source={Assets.icons.boire} /></View>);
        }
      });
      return (img);
    } catch (error) {
      // TO DO
    }
  }

  // recupere les details du lieu correspondant
  const requestLieu = () => {
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
    } catch (error) {
      // TO DO
    }
  }

  // partage l'adresse du lieu 
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: lieuDetails.address + " " + lieuDetails.zipcode + " " + lieuDetails.city + " " + lieuDetails.country_name
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    requestLieu();
  }, [lieuDetails]);

  const DeleteIcon = (props) => (
    <Icon {...props} name='trash' pack='fontawesome' />
  );

  const ShareIcon = (props) => (
    <Icon {...props} name='share' />
  );

  const EditIcon = (props) => (
    <Icon {...props} name='pencil' pack='fontawesome' />
  );

  // pour passer a la carte apres la suppression
  const navigateToCarte = () => {
    navigation.navigate("Carte");
  };

  const deleteLieu = async () => {
    const action = { type: 'DELETE_LIEU', value: route.params.lieuID };
    dispatch(action);
    navigateToCarte();
    let toast = Toast.show('Le lieu est supprimé', {
      duration: Toast.durations.LONG,
    });
  }

  // sauvegarde un lieu a visiter
  const saveAvisiter = async () => {
    const action = { type: 'SAVE_A_VISITER', value: route.params.lieuID };
    dispatch(action);
    let toast = Toast.show('Ce lieu est a visiter', {
      duration: Toast.durations.LONG,
    });
  }

  // supprime un lieu qui est a visiter
  const unsaveAvisiter = async () => {
    const action = { type: 'UNSAVE_A_VISITER', value: route.params.lieuID };
    dispatch(action);
    let toast = Toast.show('Ce lieu n\'est plus a visiter', {
      duration: Toast.durations.LONG,
    });
  }

  // affiche le bon bouton en fonction de si le lieu est a visiter ou non
  const displaySaveAvisiter = () => {
    if (listeVisites.findIndex(i => i === route.params.lieuID) !== -1 ) {
      // Le lieu a visiter est sauvegardé
      return (
        <Button onPress={unsaveAvisiter}>
          Retirer des lieux a visiter
        </Button>
      );
    }
      // si le lieu n'est pas visité
    if (!(listeDejaVisites.findIndex(i => i === route.params.lieuID) !== -1)) {
    // Le lieu a visiter n'est pas sauvegardé
    return (
      <Button onPress={saveAvisiter}>
        Ajouter aux lieux a visiter
      </Button>
    );
    }
  // }
}

  // sauvegarde un lieu déja visité
  const saveDejaVisite = async () => {
    unsaveAvisiter();
    const action = { type: 'SAVE_DEJA_VISITE', value: route.params.lieuID };
    dispatch(action);
    let toast = Toast.show('Ce lieu a déja été visité', {
      duration: Toast.durations.LONG,
    });
  }

  // supprime un lieu qui est déja visité
  const unsaveDejaVisite = async () => {
    const action = { type: 'UNSAVE_DEJA_VISITE', value: route.params.lieuID };
    dispatch(action);
    let toast = Toast.show('Ce lieu n\'est plus visité', {
      duration: Toast.durations.LONG,
    });
  }

  // affiche le bon bouton en fonction de si le lieu est a visiter ou non
  const displaySaveDejaVisite = () => {
    if (listeDejaVisites.findIndex(i => i === route.params.lieuID) !== -1) {
      return (
        <Button onPress={unsaveDejaVisite}>
          Retirer des lieux déja visités
        </Button>
      );
    }
    return (
      <Button onPress={saveDejaVisite}>
        Ajouter aux lieux déja visités
      </Button>
    );
  }

  // dirige vers la page de modification d'un lieu
  const navigateToEditLieu = (lieuID) => {
    navigation.navigate("Edit lieu", { lieuID });
  };

  return (
    <Layout style={styles.container}>
      <MapView style={styles.map}
        initialRegion={coordMap}
      >
        {lieuDetails.latitude != null && lieuDetails.longitude != null ?
          <Marker
            key={lieuDetails.id}
            pinColor={"blue"}
            coordinate={{ latitude: lieuDetails.latitude, longitude: lieuDetails.longitude }}
            title={lieuDetails.name}
          />
          : null}
      </MapView>


      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.text}>
            {lieuDetails.name}
          </Text>
          <Button accessoryLeft={ShareIcon}
            onPress={onShare}
            style={styles.button}
            appearance={"ghost"}
          >
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.normalText}>
          {lieuDetails.address}
        </Text>
        <Text style={styles.normalText}>
          {lieuDetails.zipcode} {lieuDetails.city}
        </Text>
        <Text style={styles.normalText}>
          {lieuDetails.country_name}
        </Text>
      </View>

      {lieuDetails.telephone != "" ?
        <View style={styles.section}>
          <Text style={styles.normalText}>Téléphone : </Text>
          <TouchableOpacity onPress={() => Communications.phonecall(lieuDetails.telephone, true)}>
            <View style={styles.row}>
              <Icon name='phone' fill='black' width={24} height={24} />
              <Text> {lieuDetails.telephone}</Text>
            </View>
          </TouchableOpacity>
        </View>
        : null}

      {lieuDetails.site != "" ?
        <View style={styles.section}>
          <Text style={styles.normalText}>Site internet :</Text>
          <TouchableOpacity onPress={() => Communications.web(lieuDetails.site)}>
            <View style={styles.row}>
              <Icon name='link' fill='black' width={24} height={24} />
              <Text> {lieuDetails.site}</Text>
            </View>
          </TouchableOpacity>
        </View>
        : null}

      <View style={styles.section}>
        <Text style={styles.normalText}>
          {lieuDetails.description}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          {imagesTags()}
        </View>
      </View>

      {displaySaveAvisiter()}
      {displaySaveDejaVisite()}

      <View style={styles.section}>
        <View style={styles.row}>
          <Button status={"danger"} accessoryLeft={DeleteIcon} onPress={deleteLieu}></Button>
          <Button style={styles.button} onPress={() => navigateToEditLieu(lieuDetails.id)}
            accessoryLeft={EditIcon}>
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    allLieux: state.allLieuxReducer,
    listeVisites: state.listeVisitesReducer.listeVisites,
    listeDejaVisites: state.listeDejaVisitesReducer.listeDejaVisitesID
  }
}

export default connect(mapStateToProps)(DetailsLieu);

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  section: {
    paddingBottom: 15,
    paddingHorizontal: 12,
  },
  normalText: {
    fontSize: 16,
  },
  button: {
    marginLeft: 'auto',
    marginRight: 15,
  },
});
