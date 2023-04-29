import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-control-message',
  template: `
    <div *ngIf="errorMessage !== null" class="" style="color: red; padding: 3px;"
         translate [translateParams]="{value: errorMessage.value}">
      {{errorMessage.message}}
    </div>`
})
export class ControlMessagesComponent {

  static MESSAGES = {
    'required': 'REQUIRED_FIELD',
    'email': 'INVALID_EMAIL',
    'invalidPassword': 'INVALID_PASSWORD',
    'max': 'THE_MAXIMUM_VALUE_ALLOWED',
    'min': 'THE_MINIMUM_VALUE',
    'maxlength': 'MAXIMUM_SIZE',
    'minlength': 'MINIMUM_SIZE',
    'typeaudio': 'TYPE_AUDIO',
    'sizeaudio': 'SIZE_AUDIO',
    'whitespace': 'INVALID_WHITESPACE',
    'size': 'SIZE_AUDIO'
  };

  static translate: TranslateService;

  @Input()
  control: FormControl = new FormControl();

  constructor(private translate: TranslateService) {
    ControlMessagesComponent.translate = translate;
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ControlMessagesComponent.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }


  static getValidatorErrorMessage(validatorName: string, validatorValue: any) {
    return {
      //@ts-ignore
      message: ControlMessagesComponent.MESSAGES[validatorName],
      value: ControlMessagesComponent.extractValidatorValue(validatorName, validatorValue)
    };
  }

  static extractValidatorValue(validatorName: string, validatorValue: any) {
    switch (validatorName) {

      case 'max':
        return validatorValue.max;

      case 'min':
        return validatorValue.min;

      case 'maxlength':
      case 'minlength':
        return validatorValue.requiredLength;

    }
    return validatorValue;
  }
}
