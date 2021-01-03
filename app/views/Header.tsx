import { useObservableState } from 'observable-hooks';
import React, { FC } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Auth } from '../auth';
import { NavFn } from '../routes';
import { UserStore } from '../UserStore';
const logo = require('./img/Globo_logo_REV.png');

interface HeaderProps {
  message: string;
  navigate: NavFn;
}
export const Header: FC<HeaderProps> = (props) => {
  const user = useObservableState(UserStore.currentUser$);

  const toggleUser = () => {
    if (user) {
      Auth.logOut().then(() => {
        UserStore.logout();
        Alert.alert('User logged out');
      });
    } else {
      props.navigate('Login');
    }
  };

  const display = user || props.message;
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
