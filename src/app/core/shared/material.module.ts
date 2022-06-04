import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//AGRUPA MODULES DO MATERIAL
@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatTooltipModule, MatInputModule,
    MatDialogModule, MatFormFieldModule, MatCardModule, MatSidenavModule, MatDatepickerModule,
    MatNativeDateModule, MatMenuModule, MatProgressSpinnerModule
  ]
})
export class MaterialModule { }