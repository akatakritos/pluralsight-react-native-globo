import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../style/colors';

const styles = StyleSheet.create({
  base: {
    padding: 10,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
});

type GloboButtonProps = {
  type?: 'primary' | 'secondary';
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
export const GloboButton: FC<GloboButtonProps> = (props) => {
  const t = props.type || 'primary';

  return (
    <TouchableOpacity style={[props.style, styles.base, styles[t]]} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};
