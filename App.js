import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Carte from './src/components/Carte';
import Lieu from './src/components/Lieu';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import DetailsLieu from './src/components/DetailsLieu';


export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 24, // correction barre d'état
  },
})
