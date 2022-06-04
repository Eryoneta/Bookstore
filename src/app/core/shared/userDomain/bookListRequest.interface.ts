import { Observable } from "rxjs";
import { Book } from "./book.model";

export interface BookListRequest {
  getLivros(): Observable<Book[]>;
  getLivro(id: string): Observable<Book>;
  createLivro(livro: Book): Observable<Object>;
  updateLivro(livro: Book): Observable<Object>;
  deleteLivro(livro: Book): Observable<Object>;
}
export interface DataFormat {
  [key: string]: Book
}