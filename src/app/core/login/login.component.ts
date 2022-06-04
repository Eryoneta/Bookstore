import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRequestService, AuthResponseData } from '../auth/auth-request.service';
import { UserService } from '../auth/user.service';
import { UserType } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //FORMULÁRIO
  @ViewChild("formulario") formRef: NgForm;
  //MODE
  public MODE = MODE;
  public mode: MODE = MODE.LOGIN;
  //VARS
  public isLoading = false;
  public error: string;
  //MAIN
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthRequestService, private userService: UserService) { }
  ngOnInit(): void {
    this.mode = this.route.snapshot.data["mode"];
    this.route.data.subscribe((data: any) => {
      this.mode = data["mode"];
      if (this.mode === MODE.LOGOUT) {
        this.userService.currentUser = UserType.VISITOR;
        this.redirectTo("");
      }
    });
  }
  //FUNCS
  public submit() {
    if (!this.formRef.valid) return;
    const email = this.formRef.form.value.email;
    const password = this.formRef.form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    switch (this.mode) {
      case MODE.LOGIN:
        authObs = this.authService.loginUser(email, password);
        break;
      case MODE.SIGNIN:
        authObs = this.authService.registerUser(email, password);
        break;
    }
    authObs.subscribe({
      next: (data) => {
        this.isLoading = false;
        this.formRef.reset();
        switch (this.userService.currentUser) {
          case UserType.ADMIN:
            this.redirectTo("/dashboard");
            break;
          case UserType.CLIENT:
            this.redirectTo("/shelf");
            break;
        }
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
      }
    });
  }
  public cancel() {
    this.redirectTo("");
    this.formRef.reset();
  }
  private redirectTo(url: string) {
    this.router.navigate([url]);
  }
}
export enum MODE {
  LOGIN, SIGNIN, LOGOUT
}