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
    elevation: 8,
    borderRadius: variables.borderRadius,
    backgroundColor: variables.colors.blue,
    marginVertical: variables.spacing.small,
    paddingVertical: variables.spacing.extraSmall,
    paddingHorizontal: variables.spacing.extraSmall,
  },
  text: {
    textAlign: 'center',
    color: variables.colors.white,
    fontSize: variables.fontSize.m,
  },
});

export default Button;
