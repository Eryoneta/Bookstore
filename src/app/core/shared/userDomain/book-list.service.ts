import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';

import { Book } from './book.model';
import { BookItem, BookList } from './bookList.interface';

@Injectable({
    providedIn: 'root'
})
export class BookListService {
    //LISTA
    private list: BookList | null = null;
    public load(list: BookList) {
        this.list = list;
        this.triggerLoad.next();
    }
    //LISTA_TRIGGER
    private triggerLoad = new Subject<void>();
    public listenForListLoad(observer: any) {
        return this.triggerLoad.subscribe(observer);
    }
    private triggerIsLoading = new BehaviorSubject<boolean>(false);
    public setLoading(isLoading: boolean) {
        this.triggerIsLoading.next(isLoading);
    }
    public listenForIsLoading(observer: any) {
        return this.triggerIsLoading.subscribe(observer);
    }
    //LIVROS
    public getLivros():BookItem[] {
        if (this.list === null) return [];
        return this.list.livros;
    }
    public getLivroById(id: string): Observable<BookItem |null>{
        if (this.list === null) return null;
        return this.list.getLivro(id);
    }
    public getPrevLivro(livro: Book | null): BookItem | null {
        if (livro === null) return null;
        if (this.list === null) return null;
        const index = this.list.livros.findIndex((l: Book) => l.id === livro.id)-1;
        return (index >= 0 ? this.list.livros[index] : null);
    }
    public getNextLivro(livro: Book | null): BookItem | null {
        if (livro === null) return null;
        if (this.list === null) return null;
        const index = this.list.livros.findIndex((l: Book) => l.id === livro.id)+1;
        return (index < this.list.livros.length ? this.list.livros[index] : null);
    }
    //EXPORT_LIVRO
    private triggerExportLivro = new Subject<Book>();
    public exportLivro(livro: Book) {
        if (Book.isValid(livro)) this.triggerExportLivro.next(livro);
    }
    public listenForExportLivro(observer: any) {
        return this.triggerExportLivro.subscribe(observer);
    }
    //[CREATE/UPDATE]_LIVRO
    public submitLivro(livro: Book) {
        if (this.list === null) return;
        const exists = this.list.livros.find((l: Book) => livro.id === l.id);
        if (!exists) {      //CREATE
            this.list.createLivro(livro);
        } else {            //UPDATE
            this.list.updateLivro(livro);
            this.triggerUpdate.next(livro);
        }
    }
    //UPDATE_TRIGGER
    private triggerUpdate = new Subject<Book>();
    public listenForLivroUpdate(observer: any) {
        return this.triggerUpdate.subscribe(observer);
    }
    //DELETE_LIVRO
    public deleteLivro(livro: Book) {
        if (this.list === null) return;
        this.list.deleteLivro(livro);
        this.triggerDelete.next(livro);
    }
    //DELETE_TRIGGER
    private triggerDelete = new Subject<Book>();
    public listenForLivroDeletion(observer: any) {
        return this.triggerDelete.subscribe(observer);
    }
    //MAIN
    constructor() { }
}