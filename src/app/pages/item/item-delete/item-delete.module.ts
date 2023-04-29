import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { NgxLoadingModule } from 'ngx-loading';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlMessageModule } from 'src/app/core/components/control-message/control-message.module';
import { ToolbarModule } from 'src/app/core/components/toolbar/toolbar.module';
import { AngularMaterialModule } from 'src/app/shared/interface/angular-material.module';
import { ItemDeleteComponent } from './item-delete.component';


@NgModule({
    declarations: [
        ItemDeleteComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        NgxLoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#0082f0',
            secondaryColour: '#0082f0',
            tertiaryColour: '#0082f0'
        }),
        FormsModule,
        ReactiveFormsModule,
        ControlMessageModule,
        RouterModule,
        ToolbarModule,
        AngularMaterialModule
    ],
    providers: []
})
export class ItemDeleteModule {
}
