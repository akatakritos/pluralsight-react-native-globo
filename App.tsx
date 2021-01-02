import React from 'react';
import { Home } from './app/views/Home';
import { Contact } from './app/views/Contact';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Video } from './app/views/Video';
import { VideoDetail } from './app/views/VideoDetail';
import { Register } from './app/views/Register';
import { Login } from './app/views/Login';
import { Auth } from './app/auth';
import { UserStore } from './app/UserStore';

const AppNavigator = createStackNavigator(
  {
    Home,
    Contact,
    Video,
    VideoDetail,
    Register,
    Login,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

Auth.getCurrentUser().then((result) => {
  if (result.type === 'LoggedIn') {
    UserStore.login(result.username);
  }
});
