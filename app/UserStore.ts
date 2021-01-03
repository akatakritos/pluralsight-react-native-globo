import { BehaviorSubject } from 'rxjs';

class UserStoreClass {
  private source = new BehaviorSubject<string | undefined>(undefined);

  public readonly currentUser$ = this.source.asObservable();

  public login(username: string) {
    this.source.next(username);
  }

  public logout() {
    this.source.next(undefined);
  }
}

export const UserStore = new UserStoreClass();
