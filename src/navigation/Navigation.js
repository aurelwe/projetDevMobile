import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, TopNavigationAction, Icon } from '@ui-kitten/components';

import Carte from '../components/Carte';
import DetailsLieu from '../components/DetailsLieu';
import Accueil from '../components/Accueil';
import Search from '../components/Search';
import AddLieu from '../components/AddLieu';
import EditLieu from '../components/EditLieu';
import MesListes from '../components/MesListes';

const {Navigator, Screen} = createBottomTabNavigator();
const MapNavigation = createStackNavigator();
const SearchNavigation = createStackNavigator();
const MyListsNavigation = createStackNavigator();

const AccueilIcon = (props) => (
  <Icon {...props} name='home' pack='fontawesome'/>
);

const MapIcon = (props) => (
  <Icon {...props} name='map' pack='fontawesome'/>
);

const SearchIcon = (props) => (
  <Icon {...props} name='search' pack='fontawesome'/>
);

const AddIcon = (props) => (
  <Icon {...props} name='plus' pack='fontawesome'/>
);

const ListesIcon = (props) => (
  <Icon {...props} name='star' pack='fontawesome'/>
);

const renderAddAction = () => (
  <TopNavigationAction icon={AddIcon}/>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Accueil" icon={AccueilIcon}/>
    <BottomNavigationTab title="Carte" icon={MapIcon}/>
    <BottomNavigationTab title="Search" icon={SearchIcon}/>
    <BottomNavigationTab title="Mes Listes" icon={ListesIcon}/>
  </BottomNavigation>
);

function map() {
  
  return (
    // <TopNavigation accessoryRight={renderAddAction}/>
    <MapNavigation.Navigator 
      initialRouteName="ViewCarte"> 
      <MapNavigation.Screen name="Carte" component={Carte} />           
      <MapNavigation.Screen name="Details" component={DetailsLieu}/>
      <MapNavigation.Screen name="Nouveau lieu" component={AddLieu}/>
      <MapNavigation.Screen name="Edit lieu" component={EditLieu}/>
    </MapNavigation.Navigator>
  )
}


function search() {
  return (
    <SearchNavigation.Navigator 
      initialRouteName="ViewSearch" > 
      <SearchNavigation.Screen name="Search" component={Search} />
      <SearchNavigation.Screen name="Details" component={DetailsLieu}/>
    </SearchNavigation.Navigator>
  )
}

function mesListes(){
  return (
    <MyListsNavigation.Navigator 
      initialRouteName="ViewList" > 
      <MyListsNavigation.Screen name="Mes listes" component={MesListes} />
      <MyListsNavigation.Screen name="Details" component={DetailsLieu}/>
      <MyListsNavigation.Screen name="Edit lieu" component={EditLieu}/>
    </MyListsNavigation.Navigator>
  )
}

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />} 
    screenOptions={{
      unmountOnBlur: true
    }}>
    <Screen name="Accueil" component={Accueil} />
    <Screen name="Map" component={map} options={{headerShown: false}}/>
    <Screen name="Recherche" component={search} options={{headerShown: false}}/>
    <Screen name="Mes Listes" component={mesListes} options={{headerShown: false}}/>
  </Navigator>
);

export default TabNavigator;