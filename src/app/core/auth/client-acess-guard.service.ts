import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserType } from '../user.model';
import { AcessGuard } from './acessGuard.model';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAcessGuardService extends AcessGuard {
  //MAIN
  constructor(userService: UserService, router: Router, currentRoute: ActivatedRoute) {
    super(userService, router, currentRoute);
    this.allowedUser = UserType.CLIENT;
  }
}