import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavPropsFor } from '../routes';
import { Colors } from '../style/colors';
import { Header } from './Header';
import { Hero } from './Hero';
import { Menu } from './Menu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

type HomeProps = NavPropsFor<'Home'>;
export const Home: FC<HomeProps> = (props) => {
  const { navigate } = props.navigation;

  return (
    <View style={styles.container}>
      <Hero />
      <Menu navigate={navigate} />
    </View>
  );
};
