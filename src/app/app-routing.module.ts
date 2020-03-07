import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import Main from './app.component';

const routes: Routes = [{ path: '', component: Main }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export default class AppRoutingModule {}
