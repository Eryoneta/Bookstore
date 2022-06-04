import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BookListService } from './book-list.service';
import { BookRequestService } from './book-request.service';
import { Book } from './book.model';
import { BookItem, BookList } from './bookList.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService implements BookList {
  //LIVROS
  public livros: BookItem[] = [];
  //MAIN
  constructor(private bookListService: BookListService, private requestService: BookRequestService) { }
  //FUNCS
  public loadOnList() {
    this.loadLivros();
    this.bookListService.load(this);
  }
  loadLivros(): void {
    this.bookListService.setLoading(true);
    this.requestService.getLivros().subscribe((livros: BookItem[]) => {
      this.livros = livros;
      this.bookListService.setLoading(false);
    });
  }
  getLivro(id: string): Observable<Book | null> {
    this.bookListService.setLoading(true);
    return this.requestService.getLivro(id).pipe(tap(() => {
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