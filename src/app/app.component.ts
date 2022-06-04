import { Component, OnInit } from '@angular/core';
import { AuthRequestService } from './core/auth/auth-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //TITULO
  title = 'Bookstore';
  //MAIN
  constructor(private authService:AuthRequestService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}