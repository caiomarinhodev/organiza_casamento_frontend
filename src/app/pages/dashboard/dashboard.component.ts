import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/interface/base.component';

import {
  webSocket
} from 'rxjs/webSocket';
import {
  of,
  Subscription
} from 'rxjs';
import {
  concatMap,
  delay
} from 'rxjs/operators';

import * as Highcharts from 'highcharts';

import HC_stock from 'highcharts/modules/stock';
HC_stock(Highcharts);

import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  title = 'Angular-RxJsWebSocket-HighCharts';
  rate: any;
  // @ts-ignore
  rate$: Subscription;
  chardata: any[] = [];
  chartOptions: any;
  subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin')

  loading = false;

  Highcharts: typeof Highcharts = Highcharts;


  constructor(private route: ActivatedRoute) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loading = true;

    this.rate = this.subject.pipe(
      concatMap(item => of(item).pipe(delay(1000)))
    ).subscribe(data => {
      this.rate = data;
      this.chardata.push(Number(this.rate.bitcoin))
      this.chartOptions = {
        series: [{
          data: this.chardata,
        },],
        chart: {
          type: "line",
          zoomType: 'x'
        },
        title: {
          text: "BTC/USD each second",
        },
      };
      this.loading = false;
    });
  }


  getServiceURL(): string {
    return '';
  }
  getRouterURL(): string {
    return '';
  }

}
