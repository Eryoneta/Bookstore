import { BookItem } from "./bookList.interface";

export class Book implements  BookItem {
    //VARS
    public id: string = "-1";
    public title: string = "";
    public subtitle: string = "";
    public author: string = "";
    public description: string = "";
    public imgUrl: string = "";
    public date: Date = new Date();
    public publisher: string = "";
    public tags?: string[] = [];
    //MAIN
    constructor(id: string, title: string, subtitle: string, author: string, description: string,
        date: Date, publisher: string, imgUrl: string, tags: string[]);//COMPLETO
    constructor(id: string, title: string, desc: string, imgUrl: string);//BÁSICO
    constructor(data: Book);//SIMPLES
    constructor();//INIT
    constructor(...arr: any[]) {
        if (arr.length === 1) {
            this.id = arr[0].id;
            this.title = arr[0].title;
            this.subtitle = arr[0].subtitle;
            this.author = arr[0].author;
            this.description = arr[0].description;
            this.date = arr[0].date;
            this.publisher = arr[0].publisher;
            this.imgUrl = arr[0].imgUrl;
            this.tags = arr[0].tags;
        }
        if (arr.length === 4) {
            if (typeof arr[0] === "string") this.id = arr[0];
            if (typeof arr[1] === "string") this.title = arr[1];
            if (typeof arr[2] === "string") this.description = arr[2];
            if (typeof arr[3] === "string") this.imgUrl = arr[3];
        }
        if (arr.length === 9) {
            if (typeof arr[0] === "string") this.id = arr[0];
            if (typeof arr[1] === "string") this.title = arr[1];
            if (typeof arr[2] === "string") this.subtitle = arr[2];
            if (typeof arr[3] === "string") this.author = arr[3];
            if (typeof arr[4] === "string") this.description = arr[4];
            if (arr[4] instanceof Date) this.date = arr[5];
            if (typeof arr[6] === "string") this.publisher = arr[6];
            if (typeof arr[7] === "string") this.imgUrl = arr[7];
            this.tags = arr[8];
        }
    }
    public static generateId(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) +
            Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    public static getDefaultCover() {
        return "../assets/covers/default.png";
    }
    //FUNCS
    public static isValid(livro: Book) {
        if (livro.id === "-1") return false;
        if (livro.title.length === 0) return false;
        Book.isURLValid(livro.imgUrl);
        return true;
    }
    public static isURLValid(url: string) {
        try {
            new URL(url);
        } catch (error) {
            return false;
        }
        return true;
    }
    public has(campo: BookFields): boolean {
        switch (campo) {
            case BookFields.TITLE:
                return (this.title.length > 0);
            case BookFields.SUBTITLE:
                return (this.subtitle.length > 0);
            case BookFields.AUTHOR:
                return (this.author.length > 0);
            case BookFields.DESCRIPTION:
                return (this.description.length > 0);
            case BookFields.IMG_URL:
                return (this.imgUrl.length > 0);
            case BookFields.DATE:
                return true;
            case BookFields.PUBLISHER:
                return (this.publisher.length > 0);
            case BookFields.TAGS:
                return (this.tags ? this.tags.length > 0 : false);
            default:
                return false;
        }
    }
}
//LIVRO_CAMPOS
export enum BookFields {
    TITLE, SUBTITLE, AUTHOR, DESCRIPTION, IMG_URL, DATE, PUBLISHER, TAGS
}