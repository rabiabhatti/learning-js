import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Home, Medicine, Cart, Search, Prescription} from '../screens';
import variables from '../utils/css-variables';

const Stack = createStackNavigator();

const screenOptionStyle = ({route, navigation}) => {
  let left = (
    <TouchableOpacity style={styles.right} onPress={() => navigation.goBack()}>
      <Icon name="ios-arrow-back" size={30} color="#fff" />
    </TouchableOpacity>
  );

  if (route.name === 'Home') {
    left = (
      <TouchableOpacity
        style={styles.right}
        onPress={() => navigation.openDrawer()}>
        <Icon name="ios-menu" size={30} color="#ffffff" />
      </TouchableOpacity>
    );
  }

  return {
    headerStyle: {
      backgroundColor: variables.colors.blue,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitle: () => (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
        <View style={styles.searchContainer}>
          <Icon name="ios-search" size={20} color="#757575" />
          <Text style={styles.searchText} numberOfLines={1}>
            Search medicines here
          </Text>
        </View>
      </TouchableWithoutFeedback>
    ),
    headerLeft: () => left,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.cart}>
        <Icon name="md-cart" size={30} color="#fff" />
      </TouchableOpacity>
    ),
  };
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Medicine" component={Medicine} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Prescription" component={Prescription} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  searchText: {color: '#757575', paddingLeft: 5},
  right: {
    marginLeft: variables.spacing.small,
  },
  cart: {
    marginRight: variables.spacing.small,
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 8,
    marginBottom: 10,
    width: 250,
    alignItems: 'center',
  },
});

export default MainStackNavigator;
