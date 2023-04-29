import { Injectable, ViewContainerRef } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


/**
 * Module for user notification by 'toast' style.
 */
@Injectable()
export class NotificationModule {

  /**
   * Constructor.
   *
   * @param {ToastsManager} toastr
   * @param {ToastOptions} toastOptions
   */
  constructor(private toastr: ToastrService,
    public translateService: TranslateService) {
  }

  /**
   * Sets the 'View Container' for the Toast.
   *
   * @param {ViewContainerRef} vcr
   */
  setView(vcr: ViewContainerRef) {
  }

  /* Defaults */
  success() {
    this.successText('Operation performed successfully.');
  }

  successText(text: string) {
    this.translateService.get('SUCCESS').subscribe((message: string) => {
      this.toastr.success(text, message, {
        timeOut: 5000
      });
    });
  }

  error(text: string) {
    this.translateService.get('ERROR').subscribe((message: string) => {
      this.toastr.error(text, message);
    });
  }

  warning(text: string) {
    this.translateService.get('WARNING').subscribe((message: string) => {
      this.toastr.warning(text, message);
    });
  }

  info(text: string) {
    this.translateService.get('INFO').subscribe((message: string) => {
      this.toastr.info(text, message);
    });
  }


  insertSuccess() {
    this.translateService.get('INSERT_ITEM').subscribe((message: string) => {
      this.successText(message);
    });
  }

  insertError() {
    this.translateService.get('ERROR_INSERT_ITEM').subscribe((message: string) => {
      this.error(message);
    });
  }

  updateSuccess() {
    this.translateService.get('UPDATE_ITEM').subscribe((message: string) => {
      this.successText(message);
    });
  }

  updateError() {
    this.translateService.get('ERROR_UPDATE_ITEM').subscribe((message: string) => {
      this.error(message);
    });
  }

  saveSuccess() {
    this.translateService.get('SAVE_ITEM').subscribe((message: string) => {
      this.successText(message);
    });
  }

  publishWithSuccess() {
    this.translateService.get('PUBLISHED_WITH_SUCCESS').subscribe((message: string) => {
      this.successText(message);
    });
  }

  saveError() {
    this.translateService.get('ERROR_SAVE_ITEM').subscribe((message: string) => {
      this.error(message);
    });
  }

  deleteSuccess() {
    this.translateService.get('DELETE_ITEM').subscribe((message: string) => {
      this.successText(message);
    });
  }

  deleteError() {
    this.translateService.get('ERROR_DELETE_ITEM').subscribe((message: string) => {
      this.error(message);
    });
  }

}
