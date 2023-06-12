import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { NgxLoadingModule } from 'ngx-loading';


import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'src/app/core/components/toolbar/toolbar.module';
import { AngularMaterialModule } from 'src/app/shared/interface/angular-material.module';
import { AddGuestComponent } from './add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessageModule } from 'src/app/core/components/control-message/control-message.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        AddGuestComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        ControlMessageModule,
        TranslateModule,
        NgxLoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#0082f0',
            secondaryColour: '#0082f0',
            tertiaryColour: '#0082f0'
        }),
        RouterModule,
        ToolbarModule,
        AngularMaterialModule,
        NgxMaskModule.forRoot(),
    ],
    providers: []
})
export class AddGuestModule {
}
