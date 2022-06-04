import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { MyListNavComponent } from './my-list-nav/my-list-nav.component';

const routes: Routes = [
    { path: "", component: ClientDashboardComponent },
    { path: "my-list", component: MyListNavComponent },
    { path: "my-list/:bookId", component: MyListNavComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }