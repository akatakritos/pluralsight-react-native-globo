import { useEffect, useState } from 'react';

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

type LoaderProps<T, E> = {
  idle?: () => JSX.Element;
  loading?: () => JSX.Element;
  resolved?: (data: T) => JSX.Element;
  rejected?: (error: E) => JSX.Element;
  state: LoadingState<T, E>;
};
export function Loader<T, E = Error>(props: LoaderProps<T, E>) {
  switch (props.state.status) {
    case 'idle':
      return props.idle?.() || null;
    case 'loading':
      return props.loading?.() || null;
    case 'resolved':
      return props.resolved?.(props.state.value) || null;
    case 'rejected':
      return props.rejected?.(props.state.error) || null;
  }
}

export function useLoadingState<T>(
  factory: (controller: AbortController) => Promise<T>,
  dependencies: ReadonlyArray<any>
) {
  const [loadingState, setLoadingState] = useState(LoadingStates.idle<T>());

  useEffect(() => {
    const controller = new AbortController();
    setLoadingState(LoadingStates.loading());

    factory(controller)
      .then((data) => {
        setLoadingState(LoadingStates.resolved(data));
      })
      .catch((err) => {
        setLoadingState(LoadingStates.rejected(err));
      });

    return () => controller.abort();
  }, dependencies);

  return loadingState;
}
