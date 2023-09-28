import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CreatePinComponent } from './components/create-pin/create-pin.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    CreateCustomerComponent,
    CreatePinComponent
  ],
  imports: [
    CommonModule,
    NgxSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  exports: [
    CreateCustomerComponent,
    CreatePinComponent
  ]
})
export class SharedModule { }
