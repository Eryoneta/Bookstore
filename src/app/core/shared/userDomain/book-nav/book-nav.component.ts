import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/core/auth/user.service';
import { UserType } from 'src/app/core/user.model';
import { BookListService } from '../book-list.service';
import { Book } from '../book.model';

import { BookService } from '../book.service';

@Component({
  selector: 'app-book-nav',
  templateUrl: './book-nav.component.html',
  styleUrls: ['./book-nav.component.scss']
})
export class BookNavComponent implements OnInit {
  //VARS
  public baseLink = "books";
  public showCreate = false;
  public showEdit = false;
  public showDelete = false;
  public showBookmark = false;
  //MAIN
  constructor(private userService: UserService, private livroListService: BookListService, private bookService: BookService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // const id = this.route.snapshot.params["bookId"];
    // if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => {
    //   if (!livro) this.router.navigate([this.baseLink]);
    // });
    // this.route.params.subscribe((params: Params) => {
    //   const id = params["bookId"];
    //   if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => {
    //     if (!livro) this.router.navigate([this.baseLink]);
    //   });
    // });
    this.bookService.loadOnList();
    this.baseLink = "books";
    switch (this.userService.currentUser) {
      case UserType.CLIENT:
        this.showCreate = false;
        this.showEdit = false;
        this.showDelete = false;
        this.showBookmark = true;
        break;
      case UserType.ADMIN:
        this.showCreate = true;
        this.showEdit = true;
        this.showDelete = true;
        this.showBookmark = false;
        break;
    }
  }
  public createLivro() {
    this.router.navigate([this.baseLink, "add-new"]);
  }
}