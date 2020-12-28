import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Medicine} from '../screens';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Medicine" component={Medicine} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
