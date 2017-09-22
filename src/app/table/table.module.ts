import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule, SharedModule, GrowlModule, ConfirmDialogModule, DialogModule, MultiSelectModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetailComponent } from './detail/detail.component';
import { PageComponent } from './page/page.component';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
      TableComponent,
      PageComponent,
      DetailComponent
  ],
  imports: [
  	  BrowserAnimationsModule,
  	  HttpClientModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      DataTableModule,
      SharedModule,
      GrowlModule,
      ConfirmDialogModule,
      DialogModule,
      MultiSelectModule
  ],
  exports: [
      TableComponent,
      PageComponent,
      DetailComponent
  ]
})

export class TableModule {
	
	constructor() {}
}