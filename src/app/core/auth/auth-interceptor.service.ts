import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  //MAIN
  constructor(private userService:UserService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.userService.user||!this.userService.user.token)return next.handle(request);
    const modifRequest=request.clone({
      params: new HttpParams().set("auth",this.userService.user.token)
    });
    return next.handle(modifRequest);
  }
}