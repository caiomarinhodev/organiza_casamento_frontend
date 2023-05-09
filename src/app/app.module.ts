import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { setAppInjector } from './app.injector';
import { DialogDeleteModule } from './core/components/dialog-delete/dialog-delete.module';
import { NotificationModule } from './core/module/notification/notification.module';
import { CrudService } from './core/service/crud.service';
import { SearchService } from './core/service/search.service';
import { AppTranslateService } from './core/service/translate.service';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { HomeModule } from './pages/home/home.module';
import { ItemCreateModule } from './pages/item/item-create/item-create.module';
import { ItemDeleteModule } from './pages/item/item-delete/item-delete.module';
import { ItemDetailModule } from './pages/item/item-detail/item-detail.module';
import { ItemListModule } from './pages/item/item-list/item-list.module';
import { ItemUpdateModule } from './pages/item/item-update/item-update.module';
import { LoginModule } from './pages/login/login.module';
import { RegisterPagenModule } from './pages/register-page/register-page.module';
import { ChangePassModule } from './pages/reset-password/change-pass/change-pass.module';
import { ResetPassModule } from './pages/reset-password/reset-pass/reset-pass.module';
import { AngularMaterialModule } from './shared/interface/angular-material.module';
import { EventModule } from './pages/event/event.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LayoutModule,
    AngularMaterialModule,
    DialogDeleteModule,
    LoginModule,
    RegisterPagenModule,
    ResetPassModule,
    ChangePassModule,
    HighchartsChartModule,
    HomeModule,
    DashboardModule,
    ItemListModule,
    ItemCreateModule,
    ItemDetailModule,
    ItemUpdateModule,
    ItemDeleteModule,
    EventModule
  ],
  providers: [
    AppTranslateService,
    RouterModule,
    NotificationModule,
    SearchService,
    CrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    setAppInjector(this.injector);
  }
}
