import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from './Button';

import variables from '../utils/css-variables';

function Header(props) {
  return (
    <View style={[props.style, styles.contianer]}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Icon name="ios-menu" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('Search')}>
          <View style={styles.searchContainer}>
            <Icon name="ios-search" size={20} color="#757575" />
            <Text style={{color: '#757575', paddingLeft: 5}} numberOfLines={1}>
              Search medicines here
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <Icon name="md-cart" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* <View>
        {props.previous && (
        <TouchableOpacity onPress={props.navigation.goBack}>
            <Text style={{color: variables.colors.white}}>Back</Text>
        </TouchableOpacity>
       )}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    paddingTop: 35,
    flex: 1,
    paddingLeft: variables.spacing.medium,
    backgroundColor: variables.colors.blue,
  },
  title: {
    textAlign: 'center',
    color: variables.colors.white,
    fontSize: variables.fontSize.m,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 8,
    marginBottom: 10,
    width: '70%',
    alignItems: 'center',
  },
});

export default Header;
