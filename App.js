import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FontAwesomeIconsPack } from './src/fontawesome-icons';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, Persistor } from './src/store/config';



export default function App() {
  return (
    <>
    <IconRegistry icons={[EvaIconsPack, FontAwesomeIconsPack]} />
    <ApplicationProvider {...eva} theme={eva.light} store={Store}>
    <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
    <RootSiblingParent>
      <NavigationContainer>
        <Navigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </RootSiblingParent>
    </PersistGate>
      </Provider>
    </ApplicationProvider>
    </>
  );
}
