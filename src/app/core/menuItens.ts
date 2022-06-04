import { UserService } from "./auth/user.service";
import { UserType } from "./user.model";

export function getItens(user: UserService, simplified: boolean): MenuItem[] {
    switch (user.currentUser) {
        case UserType.VISITOR: default:
            return [
                { name: "Livros", icon: "library_books", link: "/books" },
                { name: "Entrar", icon: "", link: "/login" },
                { name: "Registrar", icon: "", link: "/signin" }
            ];
        case UserType.CLIENT:
            return [
                { name: "Minha Estante", icon: "dashboard", link: "/shelf" },
                { name: "Livros", icon: "library_books", link: "/books" },
                (simplified ?
                    { name: "Logout", icon: "exit_to_app", link: "/logout" }
                    : {
                        name: "Minha Conta", icon: "face", link: "", itens: [
                            { name: "Minha Estante", icon: "dashboard", link: "/shelf" },
                            { name: "Logout", icon: "exit_to_app", link: "/logout" }
                        ]
                    })
            ];
        case UserType.ADMIN:
            return [
                { name: "Dashboard", icon: "dashboard", link: "/dashboard" },
                { name: "Livros", icon: "library_books", link: "/books" },
                (simplified ?
                    { name: "Logout", icon: "exit_to_app", link: "/logout" }
                    : {
                        name: "Minha Conta", icon: "supervised_user_circle", link: "", itens: [
                            { name: "Dashboard", icon: "dashboard", link: "/dashboard" },
                            { name: "Logout", icon: "exit_to_app", link: "/logout" }
                        ]
                    })
            ];
    }
}
export interface MenuItem {
    name: string;
    icon: string;
    link: string;
    itens?: MenuItem[];
    action?: Function;
}