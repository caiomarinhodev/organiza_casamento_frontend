import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/core/interface/base.component";

import { webSocket } from "rxjs/webSocket";
import { interval, of, Subscription, throwError } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

import * as Highcharts from "highcharts";

import HC_stock from "highcharts/modules/stock";
HC_stock(Highcharts);

import HC_exporting from "highcharts/modules/exporting";
import { TranslateService } from "@ngx-translate/core";
import { CrudService } from "src/app/core/service/crud.service";
import { AppInjector } from "src/app/app.injector";
HC_exporting(Highcharts);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  loading = false;

  event: any;

  user: any;

  guests: any;

  totalGuests = 0;

  protected service: CrudService = AppInjector.get(CrudService);

  date = "";
  resultCountdown = "";

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {
    super();
    this.translate = translate;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getEvent();
    // this.getTotalGuests();
  }

  formatCoin(coin: number): string {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(coin);
  }

  getEvent(): void {
    this.loading = true;
    this.user = this.service.getUser();
    this.service.getOne("event", this.user.event).subscribe(
      (result: any) => {
        this.loading = false;
        this.event = result;
        this.date = this.event.date;
        this.countdownTimer();
      },
      (error: string) => {
        this.loading = false;
        this.notification.error(error);
      }
    );
  }

  countdownTimer() {
    if (this.date && this.date.length > 0) {
      const target = new Date(this.date);
      console.log("target", target);
      interval(1000).subscribe(() => {
        const now = new Date();
        const diff = target.getTime() - now.getTime();

        if (diff <= 0) {
          this.resultCountdown = "Já passou!";
        }

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        const remainingMonths = months % 12;
        const remainingDays = days % 30;
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        const parts = [];

        if (years > 0) {
          parts.push(`${years} ano${years > 1 ? "s" : ""}`);
        }

        if (remainingMonths > 0) {
          parts.push(
            `${remainingMonths} mes${remainingMonths > 1 ? "es" : ""}`
          );
        }

        if (remainingDays > 0) {
          parts.push(`${remainingDays} dia${remainingDays > 1 ? "s" : ""}`);
        }

        if (remainingHours > 0) {
          parts.push(`${remainingHours} hora${remainingHours > 1 ? "s" : ""}`);
        }

        if (remainingMinutes > 0) {
          parts.push(
            `${remainingMinutes} minuto${remainingMinutes > 1 ? "s" : ""}`
          );
        }

        if (remainingSeconds > 0) {
          parts.push(
            `${remainingSeconds} segundo${remainingSeconds > 1 ? "s" : ""}`
          );
        }

        this.resultCountdown = parts.join(", ");
      });
    }
  }

  getTotalGuests() {
    this.loading = true;
    let currentFilter = { event_id: "" };
    currentFilter.event_id = this.service.getUser().event;
    this.service
      .search("guests-by-event", {}, currentFilter as any)
      .subscribe((result: any) => {
        this.guests = result;
        this.totalGuests = result.length;
        result.forEach((guest: any) => {
          try {
            guest.dependents = Number(guest.dependents);
          } catch (e) {
            console.log(e);
            guest.dependents = 0;
          }
          this.totalGuests += Number(guest.dependents);
        });
        console.log("this.totalGuests", this.totalGuests);
      });
  }

  getServiceURL(): string {
    return "";
  }
  getRouterURL(): string {
    return "";
  }
}
