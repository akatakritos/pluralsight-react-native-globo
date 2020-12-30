import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from './Header';
import { Hero } from './Hero';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header message="Press to Login" />
      <Hero />
      <Text style={{ flex: 6 }}>This is a new line</Text>
    </View>
  );
};
