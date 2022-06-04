import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBookComponent } from './adminDomain/edit-book/edit-book.component';
import { AdminAcessGuardService } from './auth/admin-acess-guard.service';
import { ClientAcessGuardService } from './auth/client-acess-guard.service';
import { VisitorAcessGuardService } from './auth/visitor-acess-guard.service';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent, MODE } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookNavComponent } from './shared/userDomain/book-nav/book-nav.component';

const routes: Routes = [
    { path: "", component: CoreComponent, children: [
        //VISITOR/CLIENT/ADMIN
        { path: "", component: HomeComponent },
        { path: "signin", canActivate:[VisitorAcessGuardService], data: { mode: MODE.SIGNIN, guardRedirect: [""] },
                component: LoginComponent },
        { path: "login", canActivate:[VisitorAcessGuardService], data: { mode: MODE.LOGIN, guardRedirect: [""] },
                component: LoginComponent },
        { path: "books", component: BookNavComponent },
        //CLIENT
        { path: "shelf",
                canLoad:[ClientAcessGuardService], data: { guardRedirect: [""] },
                loadChildren: () => import("./clientDomain/client.module").then(m => m.ClientModule) },
        //ADMIN
        { path: "dashboard",
                canLoad:[AdminAcessGuardService], data: { guardRedirect: [""] },
                loadChildren: () => import("./adminDomain/admin.module").then(m => m.AdminModule) },
        { path: "books/add-new", 
                canActivate:[AdminAcessGuardService], data: { guardRedirect: ["books"] },
                component: EditBookComponent },
        { path: "books/:bookId/edit",
                canActivate:[AdminAcessGuardService], data: { guardRedirect: ["books","bookId"] },
                component: EditBookComponent },
        //CLIENT/ADMIN
        { path: "logout", canActivate:[VisitorAcessGuardService], 
                data: { mode: MODE.LOGOUT, invertDuty: true, guardRedirect: [""] },
                component: LoginComponent },
        //VISITOR/CLIENT/ADMIN
        { path: "books/:bookId", component: BookNavComponent },
        { path: "not-found", component: NotFoundComponent },
        { path: "**", redirectTo: "not-found" }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }