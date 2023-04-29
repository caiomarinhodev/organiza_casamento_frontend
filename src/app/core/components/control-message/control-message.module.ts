import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {ControlMessagesComponent} from './control-message.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [ControlMessagesComponent],
  declarations: [ControlMessagesComponent],
  providers: [],
})
export class ControlMessageModule {
}
