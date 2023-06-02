import {
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { interval } from "rxjs";
import { CrudService } from "src/app/core/service/crud.service";
import { AppTranslateService } from "src/app/core/service/translate.service";
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
export class HomePageComponent implements OnInit, OnDestroy {
  /**
   * Flags if the user is logged.
   *
   * @type {boolean}
   */
  logged = false;

  notifications: any = [];

  timeInterval: any;

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

  protected service: CrudService = AppInjector.get(CrudService);

  constructor(
    vcr: ViewContainerRef,
    public notification: NotificationModule,
    private translate: TranslateService,
    private userService: UserService,
    public translateService: AppTranslateService
  ) {
    this.notification.setView(vcr);
    this.configTranslate();
    if (this.userService.isLogged()) {
      this.user = this.userService.getUser();
      console.log("[home box page] user: ", this.user);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit(): void {
    this.getNotifications();

    this.timeInterval = interval(5000).subscribe(() => {
      this.getNotifications();
    });
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
      this.timeInterval = null;
      this.timeInterval = undefined;
      clearInterval(this.timeInterval);
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

  formattedDate(date: string): string {
    let formattedDate: string;
    let language = this.translateService.getLang();

    if (language === "pt") {
      moment.locale("pt-br");
      formattedDate = moment(date).format("DD/MM/YYYY HH:mm");
    } else if (language === "en") {
      moment.locale("en-gb");
      formattedDate = moment(date).format("MM/DD/YYYY HH:mm");
    } else if (language === "es") {
      moment.locale("es");
      formattedDate = moment(date).format("DD/MM/YYYY HH:mm");
    } else {
      formattedDate = date; // Use um formato padrão caso o idioma não seja suportado
    }
    return formattedDate;
  }

  markAsRead(notification: any) {
    this.service
      .postCustom(
        "user/" +
          this.user.user.id +
          "/notifications/" +
          notification.id +
          "/mark_read/",
        {
          notification_id: notification.id,
          user_id: this.user.user.id,
          is_read: true,
        }
      )
      .subscribe(
        (result: any) => {
          console.log("[markAsRead]", result);
          this.getNotifications();
        },
        (error: any) => {
          console.log("[markAsRead]", error);
        }
      );
  }

  markAllAsRead() {
    this.service
      .postCustom(
        "user/" + this.user.user.id + "/notifications/mark_all_read/",
        { user_id: this.user.user.id }
      )
      .subscribe(
        (result: any) => {
          console.log("[markAllAsRead]", result);
          this.getNotifications();
        },
        (error: any) => {
          console.log("[markAllAsRead]", error);
        }
      );
  }

  getNotifications() {
    this.service
      .getURL("user/" + this.user.user.id + "/notifications")
      .subscribe(
        (result: any) => {
          this.notifications = result.filter(
            (notification: any) => notification.is_read === false
          );
          console.log("[getNotifications]", result);
        },
        (error: any) => {
          console.log("[getNotifications]", error);
        }
      );
  }
}
