import { Component, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AppInjector } from "../../app.injector";
import { NotificationModule } from "../../core/module/notification/notification.module";
import { UserService } from "../../service/user/user.service";

type UserProps = {
  data_user: object;
  event: number;
  profile_data: object;
  token: string;
  type: string;
  user: object;
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {
  /**
   * Flags if the user is logged.
   *
   * @type {boolean}
   */
  logged = false;

  user: UserProps = {
    data_user: {},
    event: 0,
    profile_data: {},
    token: "",
    type: "",
    user: {},
  };

  constructor(
    vcr: ViewContainerRef,
    public notification: NotificationModule,
    private translate: TranslateService,
    private userService: UserService
  ) {
    this.notification.setView(vcr);
    this.configTranslate();
    if (this.userService.isLogged()) {
      this.user = this.userService.getUser();
      console.log(this.user);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  protected router: Router = AppInjector.get(Router);

  private configTranslate() {
    let browserLang = localStorage.getItem("lang");
    if (!browserLang) {
      browserLang = String(this.translate.getBrowserLang());
    }

    this.translate.addLangs(["en", "es", "pt"]);
    this.translate.setDefaultLang("pt");
    this.translate.use(browserLang.match(/en|es|pt/) ? browserLang : "en");
  }

  back() {
    this.router.navigate(["/"]);
  }

  logout() {
    this.userService.logout();
  }

  getYear() {
    return new Date().getFullYear();
  }
}
