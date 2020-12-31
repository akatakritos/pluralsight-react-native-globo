import React, { FC } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface MenuProps {
  navigate: (routeName: string) => void;
}

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
    backgroundColor: '#35605a',
  },
  buttonRow: { flex: 2, flexDirection: 'row', alignItems: 'center', borderColor: '#fff', borderBottomWidth: 1 },
  buttonStyles: {
    backgroundColor: '#35605a',
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});
