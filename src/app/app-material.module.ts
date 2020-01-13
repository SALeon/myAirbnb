import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatSidenavModule } from '@angular/material';

@NgModule({
  exports: [MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatSidenavModule]
})
export default class AppMaterialModule {}
