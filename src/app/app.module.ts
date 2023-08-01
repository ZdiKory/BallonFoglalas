import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxSchedulerModule, DxFormModule, DxTextBoxModule, DxDateBoxModule, DxTagBoxModule, DxSelectBoxModule } from 'devextreme-angular'; // Add the necessary modules here

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    DxSchedulerModule,
    DxFormModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxTagBoxModule,
    DxSelectBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule { }
