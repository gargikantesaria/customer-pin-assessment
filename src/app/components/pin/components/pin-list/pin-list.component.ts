import { Component, OnDestroy, OnInit } from '@angular/core';
import { PinListData } from '../../models/pin-list.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCustomerComponent } from 'src/app/components/shared/components/create-customer/create-customer.component';
import { CreatePinComponent } from 'src/app/components/shared/components/create-pin/create-pin.component';
declare var $: any;

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.css']
})
export class PinListComponent implements OnInit {
  pinList: PinListData[] = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPinList();
  }

  // get pin list
  getPinList() {
    const pinData = localStorage.getItem('pinList');
    if (pinData) {
      this.pinList = JSON.parse(pinData);
    }
  }

  // open modal accordingly
  openModal(componentName: string) {
    const modalRef = this.modalService.open(componentName == 'add-pin' ? CreatePinComponent : CreateCustomerComponent, { size: 'lg', centered: true, backdrop: 'static', modalDialogClass: 'add-modal' });

    // Handle modal close event
    modalRef.result.then(
      (result) => {
        // get updated pin list
        result === 'closePin' ? this.getPinList() : '';
      }
    );
  }
}
