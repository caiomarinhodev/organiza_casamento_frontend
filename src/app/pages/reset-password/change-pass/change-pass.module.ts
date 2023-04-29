import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';


import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ControlMessageModule } from 'src/app/core/components/control-message/control-message.module';
import { SelectLanguageModule } from 'src/app/core/components/select-language/select-language.module';
import { ToolbarModule } from 'src/app/core/components/toolbar/toolbar.module';
import { UserService } from 'src/app/service/user/user.service';
import { AngularMaterialModule } from 'src/app/shared/interface/angular-material.module';
import { ChangePassComponent } from './change-pass.component';


@NgModule({
    declarations: [
        ChangePassComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        ControlMessageModule,
        NgxLoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#0082f0',
            secondaryColour: '#0082f0',
            tertiaryColour: '#0082f0'
        }),
        AngularMaterialModule,
        ToolbarModule,
        SelectLanguageModule
    ],
    providers: [UserService]
})
export class ChangePassModule {
}
