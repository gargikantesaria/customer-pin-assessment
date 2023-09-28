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
    // get customer list from localstorage
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
  public onFileSelected(event: File[]) {
    const file: File = event[0];
    this.uploadedImage = {
      name: file.name,
      url: URL.createObjectURL(file)
    };
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
