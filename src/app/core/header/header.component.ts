import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../auth/user.service';
import { getItens } from '../menuItens';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //SIDEMENU_TRIGGER
  @Output("onSideMenuToggle") _triggerSideMenu = new EventEmitter<void>();
  public triggerSideMenu() {
    this._triggerSideMenu.emit();
  }
  //ITENS
  public itens = getItens(this.userService, false);
  //MAIN
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.listenForUserChange(() => {
      this.itens = getItens(this.userService, false);
    });
  }
}