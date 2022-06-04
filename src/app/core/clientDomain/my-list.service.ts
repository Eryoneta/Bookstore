import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BookListService } from '../shared/userDomain/book-list.service';
import { Book } from '../shared/userDomain/book.model';
import { BookList } from '../shared/userDomain/bookList.interface';
import { MyListRequestService } from './my-list-request.service';

@Injectable({
  providedIn: 'root'
})
export class MyListService implements BookList {
  //LIVROS
  public livros: Book[] = [];
  //MAIN
  constructor(private bookListService: BookListService, private requestService: MyListRequestService) {
    bookListService.listenForExportLivro((livro: Book) => {
      if (Book.isValid(livro)) this.createLivro(livro);
    });
  }
  //FUNCS
  public loadOnList() {
    this.loadLivros();
    this.bookListService.load(this);
  }
  loadLivros(): void {
    this.bookListService.setLoading(true);
    this.requestService.getLivros().subscribe((livros: Book[]) => {
      this.livros = livros;
      this.bookListService.setLoading(false);
    });
  }
  getLivro(id: string): Observable<Book> | null {
    this.bookListService.setLoading(true);
    return this.requestService.getLivro(id).pipe(tap(()=>{
      this.bookListService.setLoading(false);
    }));
  }
  createLivro(livro: Book): void {
    this.requestService.createLivro(livro).subscribe(() => {
      this.loadLivros();
    });
  }
  updateLivro(livro: Book): void {
    this.requestService.updateLivro(livro).subscribe(() => {
      this.loadLivros();
    });
  }
  deleteLivro(livro: Book): void {
    this.requestService.deleteLivro(livro).subscribe(() => {
      this.loadLivros();
    });
  }
}