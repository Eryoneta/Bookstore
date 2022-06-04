import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookListService } from '../book-list.service';
import { BookFields, Book } from '../book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  //VARS
  @Input() baseLink = "";
  public defaultImage = Book.getDefaultCover();
  //LIVRO
  public livro: Book | null = null;
  //LIVRO_CAMPOS
  public livroField = BookFields;
  //MAIN
  constructor(private livroListService: BookListService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    const id = this.route.snapshot.params["bookId"];
    if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => this.showLivro(livro));
    this.route.params.subscribe((params: Params) => {
      const id = params["bookId"];
      if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => this.showLivro(livro));
    });
    this.livroListService.listenForLivroUpdate((livro: Book) => {
      this.livro = null;
      this.livro = livro;
    });
    this.livroListService.listenForLivroDeletion((livro: Book) => {
      if (this.hasLivro()) if (this.livro!.id === livro.id) this.livro = null;
    });
    this.livroListService.listenForListLoad(() => {
      this.livro = null;
    });
  }
  //FUNCS
  public hasLivro(): boolean {
    return (this.livro !== null);
  }
  public hasPrevLivro(): boolean {
    if (!this.hasLivro()) return false;
    return (this.livroListService.getPrevLivro(this.livro) != null);
  }
  public hasNextLivro(): boolean {
    if (!this.hasLivro()) return false;
    return (this.livroListService.getNextLivro(this.livro) != null);
  }
  public has(campo: BookFields): boolean {
    if (!this.hasLivro()) return false;
    return this.livro!.has(campo);
  }
  public livroGet(campo: BookFields, valorPadrao: string): any {
    if (!this.hasLivro()) return valorPadrao;
    if (!this.livro!.has(campo)) return valorPadrao;
    switch (campo) {
      case BookFields.TITLE:
        return this.livro!.title;
      case BookFields.SUBTITLE:
        return this.livro!.subtitle;
      case BookFields.AUTHOR:
        return this.livro!.author;
      case BookFields.DESCRIPTION:
        return this.livro!.description;
      case BookFields.IMG_URL:
        return this.livro!.imgUrl;
      case BookFields.DATE:
        return this.livro!.date;
      case BookFields.PUBLISHER:
        return this.livro!.publisher;
      default:
        return "";
    }
  }
  public showLivro(livro: Book | null) {
    this.livro = livro;
  }
  public prevLivro() {
    if (!this.hasPrevLivro()) return;
    const prevLivro = this.livroListService.getPrevLivro(this.livro);
    this.router.navigate([this.baseLink, prevLivro!.id]);
  }
  public nextLivro() {
    if (!this.hasNextLivro()) return;
    const nextLivro = this.livroListService.getNextLivro(this.livro);
    this.router.navigate([this.baseLink, nextLivro!.id]);
  }
}