import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { AngularMaterialModule } from 'src/app/shared/interface/angular-material.module';
import { ControlMessageModule } from '../control-message/control-message.module';
import { DialogDeleteComponent } from './dialog-delete.component';

@NgModule({
    imports: [CommonModule, TranslateModule, ControlMessageModule, AngularMaterialModule],
    exports: [DialogDeleteComponent],
    declarations: [DialogDeleteComponent],
    providers: [],
})
export class DialogDeleteModule {
}
