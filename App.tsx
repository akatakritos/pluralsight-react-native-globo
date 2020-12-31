import React from 'react';
import { Home } from './app/views/Home';
import { Contact } from './app/views/Contact';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Contact: {
      screen: Contact,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
