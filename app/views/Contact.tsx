import React, { FC, useReducer } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { NavPropsFor } from '../routes';
import { Colors } from '../style/colors';
import { Header } from './Header';
import { GloboButton } from './widgets/GloboButton';

type Actions =
  | { type: 'messageChanged'; payload: string }
  | { type: 'nameChanged'; payload: string }
  | { type: 'emailChanged'; payload: string }
  | { type: 'clear' };

type ContactState = {
  message: string;
  name: string;
  email: string;
};

function reducer(state: ContactState, action: Actions): ContactState {
  switch (action.type) {
    case 'messageChanged':
      return { ...state, message: action.payload };
    case 'nameChanged':
      return { ...state, name: action.payload };
    case 'emailChanged':
      return { ...state, email: action.payload };
    case 'clear':
      return { ...state, message: '', email: '', name: '' };
  }
}

type ContactProps = NavPropsFor<'Contact'>;

export const Contact: FC<ContactProps> = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, {
    message: 'Enter Message',
    name: 'Enter Name',
    email: 'Enter your Email Address',
  });

  const sendMessage = () => {
    Alert.alert(state.name, state.message);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

      <TextInput
        style={styles.inputs}
        onChangeText={(payload) => dispatch({ type: 'nameChanged', payload })}
        value={state.name}
      />

      <TextInput
        style={[styles.inputs, styles.multiInput]}
        onChangeText={(payload) => dispatch({ type: 'messageChanged', payload })}
        value={state.message}
        multiline
        numberOfLines={4}
      />

      <TextInput
        style={styles.inputs}
        onChangeText={(payload) => dispatch({ type: 'emailChanged', payload })}
        value={state.email}
      />

      <GloboButton type="primary" text="Send Message" style={styles.buttons} onPress={sendMessage} />
      <GloboButton type="secondary" text="Reset" style={styles.buttons} onPress={() => dispatch({ type: 'clear' })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '45%',
  },
  heading: {
    fontSize: 16,
    flex: 1,
  },
  inputs: {
    flex: 1,
    width: '80%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.black,
  },
  multiInput: {
    flex: 2,
    paddingTop: 20,
  },
  buttons: {
    marginTop: 10,
    minWidth: 150,
  },
});
