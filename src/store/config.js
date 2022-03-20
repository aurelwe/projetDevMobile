import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import allLieuxReducer from './reducers/allLieux';

const configPersist = {
    key: 'root',
    storage: AsyncStorage,
  };

  const reducerPersist = persistReducer(configPersist, allLieuxReducer);

  export const Store = createStore(reducerPersist);
  export const Persistor = persistStore(Store);