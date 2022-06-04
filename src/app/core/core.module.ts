import { NgModule } from '@angular/core';

import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './shared/userDomain/user.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    UserModule
  ]
})
export class CoreModule { }