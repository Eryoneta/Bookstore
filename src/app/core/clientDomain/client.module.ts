import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { MyListNavComponent } from './my-list-nav/my-list-nav.component';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../shared/userDomain/user.module';
import { MyListService } from './my-list.service';

@NgModule({
  declarations: [
    ClientDashboardComponent,
    MyListNavComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule,
    UserModule
  ]
})
export class ClientModule { }