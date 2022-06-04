import { EventEmitter, Injectable } from '@angular/core';
import { User, UserType } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //USER
  public user:User;
  //CURRENT_USER
  private _currentUser = UserType.VISITOR;
  set currentUser(user: UserType) {
    this._currentUser = user;
    this.triggerUser.emit();
  }
  get currentUser() {
    return this._currentUser;
  }
  private triggerUser = new EventEmitter<void>();
  public listenForUserChange(observer: any) {
    return this.triggerUser.subscribe(observer);
  }
  //MAIN
  constructor() { }
  //FUNCS
  public is(...users: UserType[]): boolean {
    for (let user of users) {
      if (this.currentUser === user) return true;
    }
    return false;
  }
}