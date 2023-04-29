import { FormControl } from '@angular/forms';

export class CustomValidators {

  static noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


  static maxLengthTagsValidator(control: FormControl) {
    if (control.value) {
      const len = control.value.toString().length;
      const requiredLen = 255;
      return len <= requiredLen ? null : { 'maxlength': { actualLength: len, requiredLength: requiredLen } };
    }
    return null;
  }

  static emailValidator(control: FormControl) {
    if (!control.value) {
      return null;
    }

    const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value.toString().toLowerCase());
    return valid ? null : { 'email': true };
  }
}


