import React, { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../style/colors';

const styles = StyleSheet.create({
  text: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.black,
  },
});
export const GloboTextInput: FC<TextInputProps> = (props) => (
  <TextInput {...props} style={StyleSheet.compose(styles.text, props.style as any)} />
);
