import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppTranslateService {

  constructor(private translate: TranslateService) {
  }

  public setLang(lang: string): void {
    localStorage.setItem('lang', String(lang));
    this.translate.use(lang);
  }

  public getLang() {
    const lang = localStorage.getItem('lang');
    if (lang) {
      return lang;
    }
    if (this.translate.getBrowserLang()) {
      return String(this.translate.getBrowserLang());
    } else {
      return 'en';
    }
  }

}
