import { TouchableHighlight, TouchableHighlight, TouchableHighlight } from 'react-native-gesture-handler';

export type LoadingState<T, E = Error> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'resolved'; value: T }
  | { status: 'rejected'; error: E };

function idle<T, E = Error>(): LoadingState<T, E> {
  return { status: 'idle' };
}

function loading<T, E = Error>(): LoadingState<T, E> {
  return { status: 'loading' };
}

function resolved<T, E = Error>(value: T): LoadingState<T, E> {
  return { status: 'resolved', value };
}

function rejected<T, E = Error>(error: E): LoadingState<T, E> {
  return { status: 'rejected', error };
}

export const LoadingStates = {
  idle,
  loading,
  resolved,
  rejected,
};
