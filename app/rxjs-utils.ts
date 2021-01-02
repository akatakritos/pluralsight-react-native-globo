import { UnaryFunction, Observable, pipe, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Result, Ok, Err } from './Result';

/**
 * rxjs operator to convert a observable to an obserable of Results
 */
export function wrapResult<T>(): UnaryFunction<Observable<T>, Observable<Result<T, Error>>> {
  return pipe(
    map<T, Ok<T, Error>>((emitted) => new Ok<T, Error>(emitted)),
    catchError((error: Error) => of(new Err<T, Error>(error)))
  );
}

export function mapResult<T, U>(fn: (val: T) => U) {
  return pipe(map((result: Result<T, Error>) => result.map(fn)));
}

/**
 * Filters an observable of Result<T, E> to only those that are Ok
 */
export function filterOk<T, E>() {
  return pipe(
    filter((result: Result<T, E>) => result.isOk()),
    map((result: Ok<T, E>) => result.value)
  );
}

/**
 * Unwraps a result and runs a switchMap operation with the underlying value
 *
 * If the input as Err, the output will be Err, otherwise the switchMap is run and wrapped in Result
 * @param f
 */
export function switchMapResult<T, TResult>(f: (val: T) => Observable<TResult>) {
  return switchMap((result: Result<T, Error>) => {
    if (result.isErr()) {
      return of(new Err<TResult, Error>(result.error));
    }

    return f(result.value).pipe(wrapResult());
  });
}

export function debug<T>(label: string) {
  return tap<T>(
    (next) => console.log(`[${label}]`, next),
    (err) => console.error(`[${label} -- ERR]`, err),
    () => console.log(`[${label}]`, 'complete')
  );
}
