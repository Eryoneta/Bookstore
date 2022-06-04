import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../shared/userDomain/user.module';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    EditBookComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    UserModule
  ]
})
export class AdminModule { }