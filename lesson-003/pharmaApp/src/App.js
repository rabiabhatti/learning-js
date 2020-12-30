import React from 'react';
import {Provider} from 'react-redux';
import {Dimensions} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {store, persistor} from './redux';

import MainStackNavigator from './navigation/Stack';
import {SideMenu} from './components';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            hideStatusBar={false}
            overlayColor="#0000003b"
            mode="modal"
            drawerWidth={Dimensions.get('window').width - 80}
            drawerContent={(props) => <SideMenu {...props} />}>
            <Drawer.Screen name="Home" component={MainStackNavigator} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
