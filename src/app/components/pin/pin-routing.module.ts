import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinListComponent } from './components/pin-list/pin-list.component';

const routes: Routes = [
  { path: 'pin-list', component: PinListComponent },
  { path: '', redirectTo: 'pin-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinRoutingModule { }
