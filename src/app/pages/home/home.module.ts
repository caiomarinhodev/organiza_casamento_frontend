import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HomePageComponent } from './home.component';
import { NgxLoadingModule } from 'ngx-loading';


import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'src/app/core/components/toolbar/toolbar.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/shared/interface/angular-material.module';
import { SelectLanguageModule } from 'src/app/core/components/select-language/select-language.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SelectLanguageModule,
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
export class HomeModule {
}
