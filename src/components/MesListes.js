import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Tab, TabView, Text, List } from '@ui-kitten/components';


const MesListes = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <TabView
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <Tab title='A visiter'>
                <Layout style={styles.tabContainer}>
                    <List />
                </Layout>
            </Tab>
            <Tab title='Déjà visité'>
                <Layout style={styles.tabContainer}>
                    <List />
                </Layout>
            </Tab>
        </TabView>
    );


};

export default (MesListes);

const styles = StyleSheet.create({
    tabContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
})