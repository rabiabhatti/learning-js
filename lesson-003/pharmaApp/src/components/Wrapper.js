import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';

import Header from './Header';
import Loading from './Loading';

function Wrapper(props) {
  return (
    <View style={[styles.containerStyle, props.style]}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="red"
        translucent={true}
      />
      {/* <Header /> */}
      {props.loading && <Loading />}
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
});

export default Wrapper;
