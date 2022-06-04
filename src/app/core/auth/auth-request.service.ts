import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User, UserType } from '../user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  //LOGOUT_TIMER
  private logoutTimer: any;
  //LINK
  private authEndPoint = "https://identitytoolkit.googleapis.com/v1/";
  private key = "AIzaSyBgvKLaFI_HGeaGjjv7VYwAJEh177rT4rE";
  private signupURL = this.authEndPoint + "accounts:signUp?key=" + this.key;
  private loginURL = this.authEndPoint + "accounts:signInWithPassword?key=" + this.key;
  //MAIN
  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }
  //FUNCS
  public registerUser(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      this.signupURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.errorHandler),
      tap((data) => this.loadUser(data, this.userService)));
  }
  public loginUser(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      this.loginURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.errorHandler),
      tap((data) => this.loadUser(data, this.userService)));
  }
  private errorHandler(error: HttpErrorResponse) {
    if (!error.error || !error.error.error) {
      return throwError(() => new Error("Um erro ocorreu!"));
    }
    switch (error.error.error.message) {
      case "EMAIL_NOT_FOUND":
        return throwError(() => new Error("Email não encontrado!"));
      case "INVALID_PASSWORD":
        return throwError(() => new Error("Senha incorreta!"));
      case "USER_DISABLED":
        return throwError(() => new Error("Usuário desativado!"));
      case "EMAIL_EXISTS":
        return throwError(() => new Error("Esse email já existe!"));
      case "OPERATION_NOT_ALLOWED":
        return throwError(() => new Error("A Entrada está desabilitada!"));
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        return throwError(() => new Error("Detectado atividades incomuns! Tente mais tarde!"));
      default:
        return throwError(() => new Error("Um erro ocorreu!"));
    }
  }
  private loadUser(data: AuthResponseData, userService: UserService) {
    const validade = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.localId, data.idToken, validade);
    userService.user = user;
    this.setUserType(user);
    localStorage.setItem("userData", JSON.stringify(user));
    this.setAutoLogout(+data.expiresIn * 1000);
  }
  public autoLogin() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;
    const user=new User(userData.email,userData.id,userData._token,userData._tokenValidade);
    if (!user.token) return;
    this.userService.user = user;
    this.setUserType(user);
    const validade = new Date(userData._tokenValidade).getTime() - new Date().getTime();
    this.setAutoLogout(validade);
  }
  private setAutoLogout(validade: number) {
    this.resetLogoutTimer();
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, validade)
  }
  private resetLogoutTimer(){
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }
  public setUserType(user: User) {  //SERVER-SIDE!
    if (user.email === "erick.yoneta@lotus.com.br") {
      this.userService.currentUser = UserType.ADMIN;
    } else this.userService.currentUser = UserType.CLIENT;
  }
  public logout() {
    localStorage.removeItem("userData");
    this.resetLogoutTimer();
    this.router.navigate(["/logout"]);
  }
}
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}