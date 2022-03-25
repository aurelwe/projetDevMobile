import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Layout, Tab, TabView, List } from '@ui-kitten/components';
import { connect } from 'react-redux';
import Lieu from '../components/Lieu';


const MesListes = ({ navigation, allLieux, listeVisites, listeDejaVisites }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // dirige vers la page de détail d'un lieu
    const navigateToDetailsLieu = (lieuID) => {
        navigation.navigate("Details", { lieuID });
    };

    // regarde si un lieu est marqué comme a visiter ou non
    const amIaVisiter = (lieuID) => {
        if (listeVisites.findIndex(i => i === lieuID) !== -1) {
            return true;
        }
        return false;
    };

    // regarde si un lieu est marqué comme déja visité ou non
    const amIdejaVisite = (lieuID) => {
        if (listeDejaVisites.findIndex(i => i === lieuID) !== -1) {
            return true;
        }
        return false;
    };


    return (
        <TabView
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <Tab title='A visiter'>
                <Layout>
                    <View style={styles.container}>
                        <FlatList
                            data={allLieux.ajoutLieuxID}
                            extraData={listeVisites}
                            keyExtractor={(item) => item.lieu.id.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Lieu lieuxData={item} onClick={navigateToDetailsLieu} isAvisiter={amIaVisiter(item.lieu.id)} />
                                </View>)}
                        />
                    </View>
                </Layout>
            </Tab>
            <Tab title='Déjà visité'>
                <Layout>
                    <View style={styles.container}>
                        <FlatList
                            data={allLieux.ajoutLieuxID}
                            extraData={listeDejaVisites}
                            keyExtractor={(item) => item.lieu.id.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Lieu lieuxData={item} onClick={navigateToDetailsLieu} isDejaVisiter={amIdejaVisite(item.lieu.id)} />
                                </View>)}
                        />
                    </View>
                </Layout>
            </Tab>
        </TabView>
    );


};


const mapStateToProps = (state) => {
    return {
        allLieux: state.allLieuxReducer,
        listeVisites: state.listeVisitesReducer.listeVisites,
        listeDejaVisites: state.listeDejaVisitesReducer.listeDejaVisitesID
    }
}

export default connect(mapStateToProps)(MesListes);


const styles = StyleSheet.create({
    tabContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
})