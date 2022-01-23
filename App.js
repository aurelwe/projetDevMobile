import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FontAwesomeIconsPack } from './src/fontawesome-icons';



export default function App() {
  return (
    <>
    <IconRegistry icons={[EvaIconsPack, FontAwesomeIconsPack]} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Navigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ApplicationProvider>
    </>
  );
}
