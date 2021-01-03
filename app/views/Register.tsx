import React, { FC, useReducer } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { Auth } from '../auth';
import { NavPropsFor } from '../routes';
import { GloboButton } from './widgets/GloboButton';

type RegisterActions =
  | { type: 'usernameUpdated'; username: string }
  | { type: 'passwordUpdated'; password: string }
  | { type: 'passwordConfirmationUpdated'; passwordConfirmation: string };

const RegisterDefaultState = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

type RegisterState = typeof RegisterDefaultState;

function reducer(state: RegisterState, action: RegisterActions): RegisterState {
  switch (action.type) {
    case 'usernameUpdated':
      return { ...state, username: action.username };
    case 'passwordUpdated':
      return { ...state, password: action.password };
    case 'passwordConfirmationUpdated':
      return { ...state, passwordConfirmation: action.passwordConfirmation };
  }
}

type RegisterProps = NavPropsFor<'Register'>;
export const Register: FC<RegisterProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, RegisterDefaultState);

  const cancelRegister = () => {
    Alert.alert('Registration cancelled');
    props.navigation.navigate('Home');
  };

  const registerAccount = () => {
    if (!state.username) {
      Alert.alert('Please enter a username');
    } else if (state.password !== state.passwordConfirmation) {
      Alert.alert('Passwords do not match');
    } else {
      Auth.userExists(state.username).then((exists) => {
        if (exists) {
          Alert.alert(`${state.username} already exists`);
        } else {
          Auth.register(state.username, state.password).then(() => {
            Alert.alert(`${state.username} account created.`);
            props.navigation.navigate('Home');
          });
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Account</Text>

      <TextInput
        style={styles.inputs}
        onChangeText={(username) => dispatch({ type: 'usernameUpdated', username })}
        value={state.username}
      />
      <Text style={styles.label}>Enter Username</Text>

      <TextInput
        style={styles.inputs}
        onChangeText={(password) => dispatch({ type: 'passwordUpdated', password })}
        value={state.password}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Enter Password</Text>

      <TextInput
        style={styles.inputs}
        onChangeText={(passwordConfirmation) => dispatch({ type: 'passwordConfirmationUpdated', passwordConfirmation })}
        value={state.passwordConfirmation}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Confirm Password</Text>

      <GloboButton type="primary" text="Register" onPress={registerAccount} style={styles.button} />
      <GloboButton type="secondary" text="Cancel" onPress={cancelRegister} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '45%',
    paddingTop: '10%',
  },
  heading: {
    fontSize: 16,
    flex: 1,
  },
  inputs: {
    flex: 1,
    width: '80%',
    padding: 10,
  },
  label: {
    paddingBottom: 10,
  },
  button: {
    marginTop: 10,
    minWidth: 150,
  },
});
