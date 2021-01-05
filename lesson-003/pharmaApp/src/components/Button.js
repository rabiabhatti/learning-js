import * as React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import variables from '../utils/css-variables';

function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.buttonContainer, props.styles]}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: variables.borderRadius,
    padding: variables.spacing.extraSmall,
    backgroundColor: variables.colors.blue,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: variables.colors.white,
    fontSize: variables.fontSize.s,
  },
});

export default Button;
