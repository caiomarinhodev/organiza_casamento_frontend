import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseDeleteComponent } from 'src/app/core/interface/base-delete.component';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.css']
})
export class ItemDeleteComponent extends BaseDeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    super();
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


  getFormControls(): Object {
    return {
      id: new FormControl(undefined, []),
      albumId: new FormControl(undefined, [Validators.required]),
      title: new FormControl(undefined, [Validators.required]),
      url: new FormControl(undefined, [Validators.required]),
      thumbnailUrl: new FormControl(undefined, [Validators.required]),
    };
  }


}
