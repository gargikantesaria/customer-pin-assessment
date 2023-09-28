import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.css']
})
export class CreatePinComponent implements OnInit {

  pinForm: FormGroup;

  // for image upload
  uploader: FileUploader = new FileUploader({
    url: '',
    itemAlias: 'image'
  });
  public hasBaseDropZoneOver: boolean = false;
  uploadedImage: { name: string, url: string } | undefined;
  isFileInputTouched: boolean = false;

  collaboratorList: string[] = [];
  displayCollaboratorError: boolean = false;

  constructor(public activeModal: NgbActiveModal) {
    this.pinForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'collaborators': new FormControl([], Validators.required),
      'privacy': new FormControl('public', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getCustomerList();
  }

  // get customer list
  getCustomerList() {
    const getCustomers = localStorage.getItem('customerList');
    if (getCustomers) {
      this.collaboratorList = JSON.parse(getCustomers).map(customer => customer['title']);
    }
  }

  // close modal
  closeModal() {
    this.activeModal.close('closePin');
    this.pinForm.reset();
    this.uploadedImage = null;
  }

  // Trigger the hidden file input by clicking it
  openFileUploader() {
    this.isFileInputTouched = true;
    const fileInput = document.querySelector('.image-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // drag-drop file
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // select file
  public async onFileSelected(event: File[]) {
    this.isFileInputTouched = false;
    const file: File = event[0];
    this.uploadedImage = {
      name: file.name,
      url: await this.readFileAsBase64(file)
    };
  }

  // convert file to base64
  readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64String = e.target.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }


  // on blur select input : display validation error message accordingly
  onBlurSelectInput() {
    this.pinForm.get('collaborators').invalid ? this.displayCollaboratorError = true : '';
  }


  // save pin
  savePin() {
    let combinedPinList = [];
    const existingPinList = localStorage.getItem('pinList');

    existingPinList ? combinedPinList = JSON.parse(existingPinList) : '';

    let addedPinData = this.pinForm.value;
    addedPinData['image'] = this.uploadedImage;

    combinedPinList.push(addedPinData);
    localStorage.setItem('pinList', JSON.stringify(combinedPinList));

    this.closeModal();
  }
}
