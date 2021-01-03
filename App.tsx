import React, { useEffect } from 'react';
import { Home } from './app/views/Home';
import { Contact } from './app/views/Contact';
import { Video } from './app/views/Video';
import { VideoDetail } from './app/views/VideoDetail';
import { Register } from './app/views/Register';
import { Login } from './app/views/Login';
import { Auth } from './app/auth';
import { UserStore } from './app/UserStore';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteParams } from './app/routes';

const Stack = createStackNavigator<RouteParams>();

const HideNavBar = {
  headerShown: false,
};

export default function App() {
  useEffect(() => {
    Auth.getCurrentUser().then((result) => {
      if (result.type === 'LoggedIn') {
        UserStore.login(result.username);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={HideNavBar} />
        <Stack.Screen name="Contact" component={Contact} options={HideNavBar} />
        <Stack.Screen name="Video" component={Video} options={HideNavBar} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
        <Stack.Screen name="Register" component={Register} options={HideNavBar} />
        <Stack.Screen name="Login" component={Login} options={HideNavBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
