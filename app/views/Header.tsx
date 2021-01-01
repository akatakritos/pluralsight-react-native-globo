import React, { FC, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, Alert } from 'react-native';
import { NavigateFn } from './models';
import { Auth } from './auth';
const logo = require('./img/Globo_logo_REV.png');
import * as Result from './Result';

interface HeaderProps {
  message: string;
  navigate: NavigateFn;
}
export const Header: FC<HeaderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string>(null);

  useEffect(() => {
    Auth.getCurrentUser().then((result) => {
      if (result.type === 'LoggedIn') {
        setIsLoggedIn(true);
        setUser(result.username);
      }
    });
  }, []);

  const toggleUser = () => {
    if (isLoggedIn) {
      Auth.logOut().then(() => {
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
