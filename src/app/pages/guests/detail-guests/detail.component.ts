import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseItemComponent } from 'src/app/core/interface/base-item.component';

@Component({
  selector: 'app-guests-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailGuestComponent extends BaseItemComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }


  getServiceURL(): string {
    return 'guests';
  }
  getRouterURL(): string {
    return 'guests';
  }

  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }


}
