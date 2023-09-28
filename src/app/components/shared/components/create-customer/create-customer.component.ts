import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  regions: string[] = [];
  regionCountries: Record<string, string[]> = {};
  customerForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private sharedService: SharedService) {
    // initialize form
    this.customerForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'region': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getRegionList();
  }

  // close modal
  closeModal() {
    this.activeModal.close();
    this.customerForm.reset();
  }

  // get region list
  public getRegionList() {
    const data = this.sharedService.regionData;
    for (const countryCode in data) {
      if (data.hasOwnProperty(countryCode)) {
        const countryData = data[countryCode];
        const region = countryData.region;

        // Add the region to the regions array if it's not already included
        if (!this.regions.includes(region)) {
          this.regions.push(region);
        }

        // Initialize the regionCountries object if it doesn't exist
        if (!this.regionCountries[region]) {
          this.regionCountries[region] = [];
        }

        // Add the country to the corresponding region
        this.regionCountries[region].push(countryData.country);
      }
    }
  }

  // on change region
  onRegionChange(event) {
    // Reset the selected country
    this.customerForm.get('country').setValue('');
  }
}
