import { Component, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AppInjector } from "../../app.injector";
import { NotificationModule } from "../../core/module/notification/notification.module";
import { UserService } from "../../service/user/user.service";

type DataUserProps = {
  id: number;
  birthdate: string;
  cpf: string;
  custom_user: number;
  phone: string;
};

type ProfileDataProps = {
  id: number;
  address: string;
  cep: string;
  city: string;
  number: string;
  state: string;
  district: string;
  photo: string;
  type: string;
  user: number;
};

type UserDjangoProps = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

type UserProps = {
  data_user: DataUserProps;
  event: number;
  profile_data: ProfileDataProps;
  token: string;
  type: string;
  user: UserDjangoProps;
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
    data_user: { id: 0, birthdate: "", cpf: "", custom_user: 0, phone: "" },
    event: 0,
    profile_data: {
      id: 0,
      address: "",
      cep: "",
      city: "",
      number: "",
      state: "",
      district: "",
      photo: "",
      type: "",
      user: 0,
    },
    token: "",
    type: "",
    user: {
      first_name: "",
      last_name: "",
      email: "",
      id: 0,
      username: "",
    },
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

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
