import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';


import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ToolbarModule } from 'src/app/core/components/toolbar/toolbar.module';
import { AngularMaterialModule } from 'src/app/shared/interface/angular-material.module';
import { UserService } from '../../service/user/user.service';
import { ControlMessageModule } from 'src/app/core/components/control-message/control-message.module';
import { SelectLanguageModule } from 'src/app/core/components/select-language/select-language.module';
import { DashboardComponent } from './dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardModule } from 'src/app/core/components/card/card.module';
import { ChecklistModule } from 'src/app/core/components/checklist/checklist.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
    declarations: [
        DashboardComponent,
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
        SelectLanguageModule,
        HighchartsChartModule,
        CardModule,
        ChecklistModule,
        MatMomentDateModule,
    ],
    providers: [UserService]
})
export class DashboardModule {
}
