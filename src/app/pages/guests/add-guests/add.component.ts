import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseCreateComponent } from "src/app/core/interface/base-create.component";

@Component({
  selector: "app-add-guests",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddGuestComponent extends BaseCreateComponent implements OnInit {
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
      name: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.email]),
      confirmed: new FormControl(false, []),
      phone: new FormControl(undefined, []),
      photo_url: new FormControl(undefined, []),
      has_dependents: new FormControl(false, []),
      dependents: new FormControl(undefined, []),
      event: new FormControl(this.service.getUser().event, []),
    };
  }

  /**
   * Gets the service URL.
   *
   * @returns {string}
   * @override
   */
  getServiceURL(): string {
    return "guests";
  }

  /**
   * Gets the router URL>
   *
   * @returns {string}
   * @override
   */
  getRouterURL(): string {
    return "guests";
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
