import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationModule } from './core/module/notification/notification.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private vcr: ViewContainerRef,
    private router: Router,
    private notification: NotificationModule,
    private translate: TranslateService) {

    this.notification.setView(vcr);
    this.configTranslate();

  }


  ngOnInit(): void {
  }

  private configTranslate() {
    let browserLang = localStorage.getItem('lang');
    if (!browserLang) {
      browserLang = String(this.translate.getBrowserLang());
    }

    this.translate.addLangs(['en', 'es', 'pt']);
    this.translate.setDefaultLang('en');
    this.translate.use(browserLang.match(/en|es|pt/) ? browserLang : 'en');
  }

}
