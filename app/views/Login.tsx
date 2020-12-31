import React, { FC, useReducer } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { NavigationInjectedProps } from 'react-navigation';
import { hideHeader } from './utils';
import { Auth } from './auth';

type LoginActions = { type: 'usernameUpdated'; username: string } | { type: 'passwordUpdated'; password: string };

const LoginDefaultState = {
  username: '',
  password: '',
};

type LoginState = typeof LoginDefaultState;

function reducer(state: LoginState, action: LoginActions): LoginState {
  switch (action.type) {
    case 'usernameUpdated':
      return { ...state, username: action.username };
    case 'passwordUpdated':
      return { ...state, password: action.password };
  }
}

interface LoginProps extends NavigationInjectedProps {}
export const Login: FC<LoginProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, LoginDefaultState);

  const cancelLogin = () => {
    Alert.alert('Login cancelled');
    props.navigation.navigate('Home');
  };

  const login = () => {
    if (!state.username) {
      Alert.alert('Please enter a username');
    } else if (!state.password) {
      Alert.alert('Please enter a password');
    } else {
      Auth.getCurrentUser().then((userState) => {
        if (userState.type === 'LoggedIn') {
          Alert.alert('Someone already logged on');
          props.navigation.navigate('Home');
        } else {
          Auth.logIn(state.username, state.password).then((result) => {
            if (result === 'PasswordMismatch') {
              Alert.alert('Password incorrect');
            } else if (result === 'NoAccount') {
              Alert.alert(`No account for ${state.username}`);
            } else {
              Alert.alert(`${state.username} Logged In`);
              props.navigation.navigate('Home');
            }
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

      <TouchableHighlight onPress={login} underlayColor="#31e981">
        <Text style={styles.button}>Log On</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={cancelLogin} underlayColor="#31e981">
        <Text style={styles.button}>Cancel</Text>
      </TouchableHighlight>
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
    marginTop: 15,
    fontSize: 16,
  },
});

hideHeader(Login);
