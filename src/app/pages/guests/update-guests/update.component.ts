import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseEditComponent } from "src/app/core/interface/base-edit.component";

@Component({
  selector: "app-guests-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateGuestComponent extends BaseEditComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    super();
  }

  override getFormControls(): Object {
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

  getServiceURL(): string {
    return "guests";
  }

  getRouterURL(): string {
    return "guests";
  }

  updateDependents(event: any) {
    if (!event.checked) {
      this.editForm.controls["dependents"].setValue(0);
      return;
    }
  }

  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }
}
