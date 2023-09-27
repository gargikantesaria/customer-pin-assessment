import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CreatePinComponent } from './components/create-pin/create-pin.component';



@NgModule({
  declarations: [
    CreateCustomerComponent,
    CreatePinComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
