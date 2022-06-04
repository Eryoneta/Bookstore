import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookListService } from '../book-list.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  //VARS
  @Input() baseLink = "";
  @Input() showEdit = false;
  @Input() showDelete = false;
  @Input() showBookmark = false;
  public isLoading = false;
  //MAIN
  constructor(public livroListService: BookListService) { }
  ngOnInit(): void {
    this.livroListService.listenForIsLoading((isLoading: boolean) => this.isLoading = isLoading);
  }
  //FUNCS
  public getLivros(): Book[] {
    return <Book[]>this.livroListService.getLivros();
  }
}