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
import { navigationRef, RouteParams } from './app/routes';
import { Header } from './app/views/Header';
import { View } from 'react-native';

const Stack = createStackNavigator<RouteParams>();

const HideNavBar = {
  headerShown: false,
};

function noop() {}

export default function App() {
  useEffect(() => {
    Auth.getCurrentUser().then((result) => {
      if (result.type === 'LoggedIn') {
        UserStore.login(result.username);
      }
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={{ flex: 1 }}>
        <View style={{ height: '10%' }}>
          <Header message="Login" />
        </View>
        <View style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Home" screenOptions={HideNavBar}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Video" component={Video} />
            <Stack.Screen name="VideoDetail" component={VideoDetail} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}
