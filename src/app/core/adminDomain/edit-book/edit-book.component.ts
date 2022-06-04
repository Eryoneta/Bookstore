import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BookListService } from '../../shared/userDomain/book-list.service';
import { Book } from '../../shared/userDomain/book.model';
import { BookService } from '../../shared/userDomain/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  //VARS
  public defaultImage = Book.getDefaultCover();
  //FORMULÁRIO
  public formulario: FormGroup = new FormGroup({});
  //LIVRO
  private livro: Book | null = null;
  //MAIN
  constructor(private router: Router, private route: ActivatedRoute,
    private livroService: BookService,
    private livroListService: BookListService) { }
  ngOnInit(): void {
    this.livroService.loadOnList();
    const id = this.route.snapshot.params["bookId"];
    if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => this.loadForm(livro));
    this.route.params.subscribe((params: Params) => {
      const id = params["bookId"];
      if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => this.loadForm(livro));
    });
  }
  //FUNCS
  public loadForm(livro: Book | null) {
    this.livro = livro;
    this.formulario = new FormGroup({
      "title": new FormControl((livro ? livro.title : ""), [Validators.required]),
      "subtitle": new FormControl((livro ? livro.subtitle : "")),
      "author": new FormControl((livro ? livro.author : "")),
      "description": new FormControl((livro ? livro.description : ""), [Validators.required]),
      "imgUrl": new FormControl((livro ? livro.imgUrl : "")),
      "date": new FormControl((livro ? livro.date : "")),
      "publisher": new FormControl((livro ? livro.publisher : "")),
      "tags": new FormArray([])
    });
    if (livro && livro.tags) for (let tag of livro.tags) this.addTag(tag);
  }
  public addTag(tag: string) {
    const control = new FormControl(tag);
    (<FormArray>this.formulario.get("tags")).push(control);
  }
  public delTag(index: number) {
    (<FormArray>this.formulario.get("tags")).removeAt(index);
  }
  public getTags() {
    return (<FormArray>this.formulario.get("tags")).controls;
  }
  public isValid(url: string): boolean {
    return Book.isURLValid(url);
  }
  public cancel() {
    this.formulario.reset();
    this.router.navigate(["books"]);
  }
  public hasLivro() {
    return (this.livro !== null);
  }
  public submit() {
    let tags = [];
    for (let tag of this.formulario.value.tags) tags.push(tag);
    if (this.livro === null) {
      this.livroListService.submitLivro(new Book(
        Book.generateId(),
        this.formulario.value.title,
        this.formulario.value.subtitle,
        this.formulario.value.author,
        this.formulario.value.description,
        this.formulario.value.date,
        this.formulario.value.publisher,
        this.formulario.value.imgUrl,
        tags
      ));
    } else {
      this.livro.title = this.formulario.value.title;
      this.livro.subtitle = this.formulario.value.subtitle;
      this.livro.author = this.formulario.value.author;
      this.livro.description = this.formulario.value.description;
      this.livro.date = this.formulario.value.date;
      this.livro.publisher = this.formulario.value.publisher;
      this.livro.imgUrl = this.formulario.value.imgUrl;
      this.livro.tags = tags;
      this.livroListService.submitLivro(this.livro);
    }
    if (this.hasLivro()) {
      this.router.navigate(["books", this.livro!.id]);
    } else this.router.navigate(["books"]);
    this.formulario.reset();
  }
}