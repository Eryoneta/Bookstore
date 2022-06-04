import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookListService } from '../../shared/userDomain/book-list.service';
import { Book } from '../../shared/userDomain/book.model';
import { MyListService } from '../my-list.service';

@Component({
  selector: 'app-my-list-nav',
  templateUrl: './my-list-nav.component.html',
  styleUrls: ['./my-list-nav.component.scss']
})
export class MyListNavComponent implements OnInit {
  //VARS
  public baseLink = "shelf/my-list";
  public showDelete = true;
  //MAIN
  constructor(private myListService: MyListService,
    private livroListService: BookListService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    const id = this.route.snapshot.params["bookId"];
    if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => {
      if (!livro) this.router.navigate([this.baseLink]);
    });
    this.route.params.subscribe((params: Params) => {
      const id = params["bookId"];
      if (id) this.livroListService.getLivroById(id).subscribe((livro: Book) => {
        if (!livro) this.router.navigate([this.baseLink]);
      });
    });
    this.myListService.loadOnList();
  }
}