import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseItemComponent } from 'src/app/core/interface/base-item.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent extends BaseItemComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }


  getServiceURL(): string {
    return 'photos';
  }
  getRouterURL(): string {
    return 'item';
  }

  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }


}
