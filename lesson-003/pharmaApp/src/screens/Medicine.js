import * as React from 'react';
import {Button, View} from 'react-native';

function Medicine({navigation, route}) {
  console.log(route);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export default Medicine;
