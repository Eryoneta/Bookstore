import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../auth/user.service';
import { getItens, MenuItem } from '../menuItens';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  //SIDEMENU_TRIGGER
  @Output("onSideMenuHide") _hideSideMenu = new EventEmitter<void>();
  public hideSideMenu() {
    this._hideSideMenu.emit();
  }
  //ITENS
  public itens: MenuItem[] = getItens(this.userService, true);
  //MAIN
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.listenForUserChange(() => {
      this.itens = getItens(this.userService, true);
    });
  }
}
