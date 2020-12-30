import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';

import {Button, Wrapper, Header} from '../components';
import variables from '../utils/css-variables';

function Home({navigation}) {
  const [count, setCount] = useState(0);

  return (
    <Wrapper style={styles.wrapperStyle}>
      <Text>You clicked {count} times</Text>
      <Button title="Click me" onPress={() => setCount(count + 1)} />
      <Button
        onPress={() => navigation.navigate('Medicine')}
        title="Go to Medicine"
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    paddingHorizontal: 10,
  },
});

export default Home;
