import React, { useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const logo = require('./img/Globo_logo_REV.png');

export const Header = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleUser = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const display = isLoggedIn ? 'Sample User' : props.message;
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
