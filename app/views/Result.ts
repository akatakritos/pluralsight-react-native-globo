interface ResultClass<T, E> {
  /**
   * Tells you if this result is successful, and if so, you can retrieve the `value` property
   */
  isOk(): this is Ok<T, E>;

  /**
   * Tells you if the result was an error, and if so, you can retrieve the `error` property
   */
  isErr(): this is Err<T, E>;

  /**
   * Maps a successful value of one type to a successful value of another. If it was an error, the error is propogated
   * @param fn - mapping function to invoke over the successful value
   */
  map<U>(fn: (val: T) => U): Result<U, E>;

  valueOr(defaultValue: T): T;
}

/**
 * A Result is either `Ok` with the value you want, or `Err` with some kind
 * of error data.
 */
export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

function ok<T, E = Error>(value: T): Result<T, E> {
  return new Ok(value);
}

function err<T, E = Error>(error: E): Result<T, E> {
  return new Err<T, E>(error);
}

function isOk<T, E = Error>(result: Result<T, E>) {
  return result.isOk();
}

function isErr<T, E = Error>(result: Result<T, E>) {
  return result.isErr();
}

function map<T, E, K>(r: Result<T, E>, f: (value: T) => K) {
  return r.map(f);
}

function fromPromise<T, E>(p: Promise<T>): Promise<Result<T, E>> {
  return new Promise(function (resolve, reject) {
    p.then((value) => resolve(ok(value))).catch((error) => resolve(err(error)));
  });
}

export const Results = {
  ok,
  err,
  isOk,
  isErr,
  map,
  fromPromise,
};

/**
 * Represents the successful case
 */
export class Ok<T, E = Error> implements ResultClass<T, E> {
  constructor(public readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }

  map<U>(fn: (a: T) => U): Result<U, E> {
    return new Ok<U, E>(fn(this.value));
  }

  valueOr(defaultValue: T) {
    return this.value;
  }
}

export class Err<T, E = Error> implements ResultClass<T, E> {
  constructor(public readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }

  map<U>(fn: (a: T) => U): Result<U, E> {
    return (this as unknown) as Err<U, E>;
  }

  valueOr(defaultValue: T) {
    return defaultValue;
  }
}
