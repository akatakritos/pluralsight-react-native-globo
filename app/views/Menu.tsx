import React, { FC } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavFn, NavPropsFor } from '../routes';
import { Colors } from '../style/colors';

type MenuProps = {
  navigate: NavFn;
};

export const Menu: FC<MenuProps> = ({ navigate }) => {
  const onPress = () => Alert.alert('You tapped the button');

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('Video')}>
          <Text style={styles.buttonText}>LESSONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('Register')}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonStyles} onPress={onPress}>
          <Text style={styles.buttonText}>BLOG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('Contact')}>
          <Text style={styles.buttonText}>CONTACT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonStyles} onPress={onPress}>
          <Text style={styles.buttonText}>QUIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles} onPress={onPress}>
          <Text style={styles.buttonText}>ABOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: Colors.brandGreen,
  },
  buttonRow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonStyles: {
    backgroundColor: Colors.brandGreen,
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
  },
});
