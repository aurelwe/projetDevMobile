import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';


import Carte from '../components/Carte';
import DetailsLieu from '../components/DetailsLieu';
import Accueil from '../components/Accueil';

const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function carte() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewCarte"
    >
      <SearchNavigation.Screen
        name="ViewCarte"
        component={Carte}
        options={{ title: 'Carte' }}
      />
      <SearchNavigation.Screen
        name="ViewDetailsLieu"
        component={DetailsLieu}
        options={{ title: 'Details du lieu' }}
      />
    </SearchNavigation.Navigator>
  )
};

function accueil() {
  return (
    <FavNavigation.Navigator
      initialRouteName="ViewAccueil"
    >
      <FavNavigation.Screen
        name="ViewAccueil"
        component={Accueil}
        options={{ title: 'Accueil' }}
      />
    </FavNavigation.Navigator>
  )
};

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false
      }}>

      <TabNavigation.Screen
        name="Accueil"
        component={accueil}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Text>Accueil</Text>;
          }
        })}
      />

      <TabNavigation.Screen
        name="Carte"
        component={carte}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Text>Carte</Text>;
          }
        })}
      />

    </TabNavigation.Navigator>
  );
}

export default RootStack;