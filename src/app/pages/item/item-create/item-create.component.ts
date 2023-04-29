import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseCreateComponent } from 'src/app/core/interface/base-create.component';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent extends BaseCreateComponent implements OnInit {

  /**
   * Constructor.
   *
   * @param {ActivatedRoute} route
   * @param {TagsUtilService} tagsUtilService
   */
  constructor(private route: ActivatedRoute) {
    super();
  }



  /**
   * Gets the form controls.
   *
   * @returns {Object}
   * @override
   */
  getFormControls(): Object {
    return {
      id: new FormControl(undefined, []),
      albumId: new FormControl(undefined, [Validators.required]),
      title: new FormControl(undefined, [Validators.required]),
      url: new FormControl(undefined, [Validators.required]),
      thumbnailUrl: new FormControl(undefined, [Validators.required]),
    };
  }

  /**
   * Gets the service URL.
   *
   * @returns {string}
   * @override
   */
  getServiceURL(): string {
    return 'posts';
  }


  /**
   * Gets the router URL>
   *
   * @returns {string}
   * @override
   */
  getRouterURL(): string {
    return 'item';
  }

  /**
   * Gets the activated route.
   *
   * @returns {ActivatedRoute}
   * @override
   */
  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }

}
