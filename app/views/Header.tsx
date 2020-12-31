import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, Alert } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigateFn } from './models';

const logo = require('./img/Globo_logo_REV.png');

interface HeaderProps {
  message: string;
  navigate: NavigateFn;
}
export const Header: FC<HeaderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string>(null);

  useEffect(() => {
    AsyncStorage.getItem('userLoggedIn').then((result) => {
      if (result === 'none') {
        console.log('NO ONE LOGGED IN');
      } else if (result === null) {
        AsyncStorage.setItem('userLoggedIn', 'none').then(() => {
          console.log('Set user to NONE');
        });
      } else {
        console.log('logged in', result);
        setIsLoggedIn(true);
        setUser(result);
      }
    });
  }, []);

  const toggleUser = () => {
    if (isLoggedIn) {
      AsyncStorage.setItem('userLoggedIn', 'none').then(() => {
        setIsLoggedIn(false);
        setUser(null);
        Alert.alert('User logged out');
      });
    } else {
      props.navigate('Login');
    }
  };

  const display = isLoggedIn ? user : props.message;
  return (
    <View style={styles.headStyle}>
      <Image style={styles.logoStyle} source={logo} />
      <Text style={styles.headText} onPress={toggleUser}>
        {display}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headText: {
    textAlign: 'right',
    color: '#fff',
    fontSize: 20,
    flex: 1,
  },
  headStyle: {
    paddingTop: 30,
    paddingRight: 10,
    backgroundColor: '#35605a',
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  logoStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
