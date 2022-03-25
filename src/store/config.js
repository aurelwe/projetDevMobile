import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import allLieuxReducer from './reducers/allLieux';
import listeVisitesReducer from './reducers/listeVisites';

const configPersist = {
    key: 'root',
    storage: AsyncStorage,
  };

  const appReducer = combineReducers({
    allLieuxReducer,
    listeVisitesReducer
  });
  
  const reducerPersist = persistReducer(configPersist, appReducer);
  
  export const Store = createStore(reducerPersist);
  export const Persistor = persistStore(Store);