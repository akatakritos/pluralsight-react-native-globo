import AsyncStorage from '@react-native-async-storage/async-storage';

export type LoginResult = 'NoAccount' | 'PasswordMismatch' | 'Success';

export type UserState = { type: 'None' } | { type: 'LoggedIn'; username: string };

export const UserStates = {
  none() {
    return { type: 'None' } as UserState;
  },

  loggedIn(username: string) {
    return { type: 'LoggedIn', username } as UserState;
  },
};

export const Auth = {
  getCurrentUser(): Promise<UserState> {
    return AsyncStorage.getItem('currentUser').then((currentUser) => {
      return currentUser ? UserStates.loggedIn(currentUser) : UserStates.none();
    });
  },

  register(username: string, password: string) {
    return AsyncStorage.setItem('user::' + username, password);
  },

  logIn(username: string, password: string): Promise<LoginResult> {
    return AsyncStorage.getItem('user::' + username).then((savedPassword) => {
      if (savedPassword === null) return 'NoAccount';
      if (savedPassword !== password) return 'PasswordMismatch';

      return AsyncStorage.setItem('currentUser', username).then(() => {
        return 'Success';
      });
    });
  },

  logOut() {
    return AsyncStorage.removeItem('currentUser');
  },

  userExists(username: string) {
    return AsyncStorage.getItem('user::' + username).then((password) => {
      return !!password;
    });
  },
};
