import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Book[], keyWord: string):Book[] {
    let livros:Book[]=[];
    for(let livro of value){
      if(livro.title.includes(keyWord))livros.push(livro);
    }
    return livros;
  }
}
