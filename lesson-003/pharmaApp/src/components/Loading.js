import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex: 99,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#61616185',
          },
        ]}>
        <ActivityIndicator size={'large'} color="#0c6964" />
        <Text
          style={{
            color: '#0c6964',
            fontWeight: '700',
            marginTop: 7,
            fontSize: 19,
          }}>
          Please wait
        </Text>
      </View>
    );
  }
}
