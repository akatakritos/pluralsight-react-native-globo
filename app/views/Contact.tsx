import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const Contact = () => {
  return (
    <View style={styles.container}>
      <Header message="Press to Login" />
      <Text style={{ flex: 8 }}>THe contact form will go here</Text>
      <Text style={{ flex: 6 }}>More contact form will go here</Text>
    </View>
  );
};

Contact.navigationOptions = {
  headerShown: false,
};
