import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinRoutingModule } from './pin-routing.module';
import { PinListComponent } from './components/pin-list/pin-list.component';


@NgModule({
  declarations: [
    PinListComponent
  ],
  imports: [
    CommonModule,
    PinRoutingModule
  ]
})
export class PinModule { }
