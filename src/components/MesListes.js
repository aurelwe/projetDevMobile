import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Layout, Tab, TabView, List } from '@ui-kitten/components';
import { connect } from 'react-redux';
import Lieu from '../components/Lieu';

import DisplayError from '../components/DisplayError';

const MesListes = ({ navigation, allLieux, listeVisites, listeDejaVisites }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [dejaVisites, setDejaVisites] = useState([]);
    const [aVisiter, setAvisiter] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        refreshDejaVisite();
        refreshAvisiter();
    }, [listeDejaVisites, listeVisites]);

    // dirige vers la page de détail d'un lieu
    const navigateToDetailsLieu = (lieuID) => {
        navigation.navigate("Details", { lieuID });
    };
    

    // regarde si un lieu est marqué comme a visiter ou non
    const amIaVisiter = (lieuID) => {
        try {
            if (listeVisites.findIndex(i => i === lieuID) !== -1) {
                return true;
            }
        } catch {
            setIsError(false);
        }
        return false;
    };

    // regarde si un lieu est marqué comme déja visité ou non
    const amIdejaVisite = (lieuID) => {
        try {
            if (listeDejaVisites.findIndex(i => i === lieuID) !== -1) {
                return true;
            }
        } catch {
            setIsError(false);
        }
        
        return false;
    };

    // recupère les lieux qui sont déja visités
    const refreshDejaVisite = async () => {
        setIsRefreshing(true);
        setIsError(false);
        let dejaVisitesRefresh = [];
        try {
            for (const id of listeDejaVisites) {
                var result = allLieux.ajoutLieuxID.filter(item => item.lieu.id == id);
                result.forEach(function (lieu) {
                    dejaVisitesRefresh.push(lieu);
                });
            };
            setDejaVisites(dejaVisitesRefresh);
        } catch (error) {
            setIsError(true);
            setDejaVisites([]);
        }
        setIsRefreshing(false);
    };

    // recupère les lieux qui sont a visiter
    const refreshAvisiter = async () => {
        setIsRefreshing(true);
        setIsError(false);
        let aVisiterRefresh = [];
        try {
            for (const id of listeVisites) {
                var result = allLieux.ajoutLieuxID.filter(item => item.lieu.id == id);
                result.forEach(function (lieu) {
                    aVisiterRefresh.push(lieu);
                });
            };
            setAvisiter(aVisiterRefresh);
        } catch (error) {
            setIsError(true);
            setAvisiter([]);
        }
        setIsRefreshing(false);
    };


    return (
        <TabView
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <Tab title='A visiter'>
                <Layout>
                    <View style={styles.container}>
                    {
                    isError ?
                        (<DisplayError message='Impossible de récupérer les lieux à visiter' />) :
                            (<FlatList
                                data={aVisiter}
                                extraData={listeVisites}
                                keyExtractor={(item) => item.lieu.id.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <Lieu lieuxData={item} onClick={navigateToDetailsLieu} isAvisiter={amIaVisiter(item.lieu.id)} />
                                    </View>)}
                                refreshing={isRefreshing}
                                onRefresh={refreshAvisiter}
                            />)
                        }
                    </View>
                </Layout>
            </Tab>
            <Tab title='Déjà visité'>
                <Layout>
                    <View style={styles.container}>
                    {
                    isError ?
                        (<DisplayError message='Impossible de récupérer les lieux déjà visités' />) :
                            (<FlatList
                            data={dejaVisites}
                            extraData={listeDejaVisites}
                            keyExtractor={(item) => item.lieu.id.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Lieu lieuxData={item} onClick={navigateToDetailsLieu} isDejaVisiter={amIdejaVisite(item.lieu.id)} />
                                </View>)}
                            refreshing={isRefreshing}
                            onRefresh={refreshDejaVisite}
                        />)
                    }
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