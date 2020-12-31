import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { Header } from './Header';
import { Hero } from './Hero';
import { Menu } from './Menu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

interface HomeProps extends NavigationInjectedProps {}
export const Home: FC<HomeProps> = (props) => {
  const { navigate } = props.navigation;

  return (
    <View style={styles.container}>
      <Header navigate={navigate} message="Press to Login" />
      <Hero />
      <Menu navigate={navigate} />
    </View>
  );
};

(Home as any).navigationOptions = {
  headerShown: false,
};
