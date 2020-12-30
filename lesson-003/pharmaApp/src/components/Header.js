import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from './Button';

import variables from '../utils/css-variables';

function Header(props) {
  return (
    <View style={[props.style, styles.contianer]}>
      <View style={styles.left}>
        <Icon name="ios-menu" size={30} color="#ffffff" />
        {/* {props.previous && ( */}
          <TouchableOpacity onPress={props.navigation.goBack}>
            <Text style={{color: variables.colors.white}}>Back</Text>
          </TouchableOpacity>
        {/* )} */}
      </View>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    paddingTop: 35,
    flex: 1,
    paddingLeft: variables.spacing.medium,
  },
  title: {
    textAlign: 'center',
    color: variables.colors.white,
    fontSize: variables.fontSize.m,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

export default Header;
