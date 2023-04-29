import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseEditComponent } from 'src/app/core/interface/base-edit.component';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent extends BaseEditComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    super();
  }

  override getFormControls(): Object {
    return {
      id: new FormControl(undefined, []),
      albumId: new FormControl(undefined, [Validators.required]),
      title: new FormControl(undefined, [Validators.required]),
      url: new FormControl(undefined, [Validators.required]),
      thumbnailUrl: new FormControl(undefined, [Validators.required]),
    };
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
