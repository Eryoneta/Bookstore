import { Observable } from "rxjs";
import { Book } from "./book.model";

export interface BookList {
    livros: BookItem[];
    loadLivros(livro: Book): void;
    getLivro(id: string): Observable<Book> | null;
    createLivro(livro: Book): void;
    updateLivro(livro: Book): void;
    deleteLivro(livro: Book): void;
}
export interface BookItem {
    id: string;
}