import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/core/interface/base.component";

import { webSocket } from "rxjs/webSocket";
import { interval, of, Subscription } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

import * as Highcharts from "highcharts";

import HC_stock from "highcharts/modules/stock";
HC_stock(Highcharts);

import HC_exporting from "highcharts/modules/exporting";
import { TranslateService } from "@ngx-translate/core";
HC_exporting(Highcharts);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  rate: any;
  // @ts-ignore
  rate$: Subscription;
  chardata: any[] = [];
  chartOptions: any;
  // subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin')

  loading = false;

  Highcharts: typeof Highcharts = Highcharts;

  date = "2023-12-25";
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
    this.countdownTimer();

  }

  formatCoin(coin: number): string {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(coin);
  }

  countdownTimer() {
    const target = new Date(this.date);
    interval(1000).subscribe(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
       this.resultCountdown =  "Já passou!";
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
        parts.push(`${remainingMonths} mes${remainingMonths > 1 ? "es" : ""}`);
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

  getServiceURL(): string {
    return "";
  }
  getRouterURL(): string {
    return "";
  }
}
