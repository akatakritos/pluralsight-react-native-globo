import React from 'react';
import { Home } from './app/views/Home';
import { Contact } from './app/views/Contact';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Video } from './app/views/Video';
import { VideoDetail } from './app/views/VideoDetail';

const AppNavigator = createStackNavigator(
  {
    Home,
    Contact,
    Video,
    VideoDetail,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
