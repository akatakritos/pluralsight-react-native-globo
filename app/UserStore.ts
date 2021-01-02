import { BehaviorSubject } from 'rxjs';
import { debug } from './rxjs-utils';

class UserStoreClass {
  private source = new BehaviorSubject<string | undefined>(undefined);

  public readonly currentUser$ = this.source.asObservable().pipe(debug('currentUser$'));

  public login(username: string) {
    this.source.next(username);
  }

  public logout() {
    this.source.next(undefined);
  }
}

export const UserStore = new UserStoreClass();
