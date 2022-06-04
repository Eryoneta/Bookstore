import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserType } from "../user.model";
import { UserService } from "./user.service";

export class AcessGuard implements CanLoad, CanActivate {
    //USUÁRIO PERMITIDO
    protected allowedUser = UserType.VISITOR;
    //MAIN
    constructor(private userService: UserService, private router: Router, private currentRoute: ActivatedRoute) { }
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let permission=this.permission();
        if(route.data!["invertDuty"])permission=!permission;
        if (!permission) this.simpleRedirect(route);
        return permission;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let permission=this.permission();
        if(route.data!["invertDuty"])permission=!permission;
        if (!permission) this.redirect(route);
        return permission;
    }
    private simpleRedirect(route: Route) {
        const customRedirect = (route.data ? route.data!["guardRedirect"] : null);
        if (customRedirect === false) return;
        if (customRedirect) {
            const redirect = customRedirect[0];
            this.router.navigate([redirect]);
        } else this.router.navigate(["/not-found"]);
    }
    private redirect(route: ActivatedRouteSnapshot) {
        const customRedirect = route.data["guardRedirect"];
        if (customRedirect === false) return;
        if (customRedirect) {
            const redirect = customRedirect[0];
            if (customRedirect.length > 1) {
                const id = customRedirect[1];
                this.router.navigate([redirect, route.params[id]]);
            } else this.router.navigate([redirect]);
        } else this.router.navigate(["/not-found"]);
    }
    private permission(): boolean {
        return (this.userService.is(this.allowedUser));
    }
}