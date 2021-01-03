import { useObservableState } from 'observable-hooks';
import React, { FC } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Auth } from '../auth';
import { navigationRef } from '../routes';
import { Colors } from '../style/colors';
import { UserStore } from '../UserStore';
const logo = require('./img/Globo_logo_REV.png');

interface HeaderProps {
  message: string;
}
export const Header: FC<HeaderProps> = (props) => {
  const user = useObservableState(UserStore.currentUser$);
  // const navigation = useNavigation<NavProp>();

  const toggleUser = () => {
    if (user) {
      Auth.logOut().then(() => {
        UserStore.logout();
        Alert.alert('User logged out');
      });
    } else {
      navigationRef.current?.navigate('Login');
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
    color: Colors.white,
    fontSize: 20,
    flex: 1,
    alignSelf: 'center',
  },
  headStyle: {
    paddingTop: 30,
    paddingRight: 10,
    backgroundColor: Colors.brandGreen,
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: Colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logoStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
