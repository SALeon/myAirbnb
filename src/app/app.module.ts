import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import AppMaterialModule from './app-material.module';
import HbHeaderComponent from './components/hb-header/hb-header.component';
import HbInputComponent from './components/common/hb-input/hb-input.component';

@NgModule({
  declarations: [AppComponent, HbHeaderComponent, HbInputComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, AppMaterialModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export default class AppModule {}
