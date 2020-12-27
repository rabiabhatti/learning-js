import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

function Home({navigation}) {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => navigation.navigate('Medicine')}
        title="Go to Medicine"
      />
    </View>
  );
}

export default Home;
