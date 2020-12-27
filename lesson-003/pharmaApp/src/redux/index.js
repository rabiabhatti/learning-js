import createAsyncStorage from 'redux-persist-react-native-async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const storage = createAsyncStorage();

const config = {
  key: 'root',
  storage,
};

const reducer = persistReducer(config, reducers);

const store = createStore(reducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export {store, persistor};
