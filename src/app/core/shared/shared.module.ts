import { NgModule } from '@angular/core';

import { LoadingComponent } from './loading/loading.component';
import { ImportsModule } from './imports.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

//AGRUPA TODOS OS IMPORTS USADOS PELO APP
@NgModule({
  declarations: [ 
    LoadingComponent, ConfirmDialogComponent
  ],
  imports:[
    ImportsModule
  ],
  exports: [
    ImportsModule,
    LoadingComponent
  ]
})
export class SharedModule { }