import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Medicine} from '../screens';
import {Header, Button} from '../components';
import variables from '../utils/css-variables';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: variables.colors.blue,
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  header: ({scene, previous, navigation}) => {
    const {options} = scene.descriptor;
    options.headerStyle = {
      // height: 80,
      backgroundColor: variables.colors.blue,
    };
    options.headerTintColor = 'white';
    options.headerBackTitle = 'Back';
    options.headerTitleStyle = {
      fontWeight: 'bold',
    };

    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;
    return (
      <Header
        title={title}
        previous={previous}
        style={options.headerStyle}
        navigation={navigation}
      />
    );
  },
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
