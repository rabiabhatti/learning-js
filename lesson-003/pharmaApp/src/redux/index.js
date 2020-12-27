import createAsyncStorage from 'redux-persist-react-native-async-storage';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {createStore} from 'redux';

import reducers from './reducers';

const storage = createAsyncStorage();

const config = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(config, reducers);

const store = createStore(reducer);
const persistor = persistStore(store);

export {store, persistor};
