import { NgModule } from '@angular/core';

import { BookNavComponent } from './book-nav/book-nav.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from '../shared.module';
import { BookListService } from './book-list.service';
import { BookService } from './book.service';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    BookNavComponent,
    BookListComponent,
    BookItemComponent,
    BookDetailComponent,
    FilterPipe
  ],
  imports: [
    SharedModule
  ],
  exports: [
    BookNavComponent,
    BookListComponent,
    BookItemComponent,
    BookDetailComponent
  ]
})
export class UserModule { }