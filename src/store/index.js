import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authReducer from './auth-slice';
import allParcelsReducer from './allParcels-slice';
import storagesReducer from '../store/Storages/storage-slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['allParcels', 'storages'],
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  allParcels: allParcelsReducer,
  auth: authReducer,
  storages: storagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
