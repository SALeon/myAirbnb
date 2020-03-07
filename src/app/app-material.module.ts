import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule
  ]
})
export default class AppMaterialModule {}
