import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseDeleteComponent } from "src/app/core/interface/base-delete.component";

@Component({
  selector: "app-guest-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.css"],
})
export class DeleteGuestComponent
  extends BaseDeleteComponent
  implements OnInit
{
  constructor(private route: ActivatedRoute) {
    super();
  }

  getServiceURL(): string {
    return "guests";
  }

  getRouterURL(): string {
    return "guests";
  }

  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }

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
}
