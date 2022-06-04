import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { BookListService } from '../../book-list.service';
import { Book } from '../../book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent {
  //VARS
  @Input() baseLink = "";
  @Input() showEdit = false;
  @Input() showDelete = false;
  @Input() showBookmark = false;
  public defaultImage = Book.getDefaultCover();
  @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;
  //LIVRO
  @Input() livro: Book = new Book();
  //MAIN
  constructor(private livroListService: BookListService, private router: Router, public dialog: MatDialog) { }
  //FUNCS
  public selecLivro() {
    this.router.navigate([this.baseLink, this.livro.id]);
  }
  public addLivroToList() {
    this.livroListService.exportLivro(this.livro);
  }
  public editLivro() {
    this.router.navigate([this.baseLink, this.livro.id, "edit"]);
  }
  public deleteLivro() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: "Deletar livro?",
        texto: "Esta ação não tem volta!"
      }
    });
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) this.livroListService.deleteLivro(this.livro);
    });
  }
}