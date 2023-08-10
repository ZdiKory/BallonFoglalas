import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxSpeedDialActionModule, DxSchedulerModule, DxFormModule, DxTextBoxModule, DxDateBoxModule, DxTagBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
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
    DxSelectBoxModule,
      DxSpeedDialActionModule,
      FormsModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule { }
