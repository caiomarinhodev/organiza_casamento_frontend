import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { NgxLoadingModule } from 'ngx-loading';


import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'src/app/core/components/toolbar/toolbar.module';
import { AngularMaterialModule } from 'src/app/shared/interface/angular-material.module';
import { DetailGuestComponent } from './detail.component';


@NgModule({
    declarations: [
        DetailGuestComponent
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
        RouterModule,
        ToolbarModule,
        AngularMaterialModule
    ],
    providers: []
})
export class DetailGuestModule {
}
