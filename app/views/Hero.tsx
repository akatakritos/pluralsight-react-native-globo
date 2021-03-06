import React from 'react';
import { StyleSheet, Image } from 'react-native';
const laptop = require('./img/laptop2.jpg');

const styles = StyleSheet.create({
  heroImage: {
    width: undefined,
    height: undefined,
    flex: 8,
  },
});

export const Hero = () => {
  return <Image style={styles.heroImage} source={laptop} />;
};
