import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Book } from '../shared/userDomain/book.model';
import { BookListRequest, DataFormat } from '../shared/userDomain/bookListRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class MyListRequestService implements BookListRequest {
  //LINK
  private getURL(id: string) {
    return "https://bookstore-6ee91-default-rtdb.firebaseio.com/my-list" + (id ? "/" + id : "") + ".json";
  }
  //MAIN
  constructor(private http: HttpClient) { }
  //FUNCS
  getLivros(): Observable<Book[]> {
    return this.http.get<DataFormat>(
      this.getURL("")
    ).pipe(map((data: DataFormat) => {
      const lista: Book[] = [];
      for (const key in data) {
        let livro: Book = new Book(data[key]);
        livro.id = key;
        lista.push(livro);
      }
      return lista;
    }), take(1));
  }
  getLivro(id: string): Observable<Book | null> {
    return this.http.get<Book>(
      this.getURL(id)
    ).pipe(map((livroData: Book) => {
      if (!livroData) return null;
      const livro: Book = new Book(livroData);
      livro.id = id;
      return livro;
    }), take(1))
  }
  createLivro(livro: Book): Observable<Object> {
    return this.http.post(
      this.getURL(""), livro
    ).pipe(take(1));
  }
  updateLivro(livro: Book): Observable<Object> {
    return null;
  }
  deleteLivro(livro: Book): Observable<Object> {
    return this.http.delete(
      this.getURL(livro.id)
    ).pipe(take(1));
  }
}