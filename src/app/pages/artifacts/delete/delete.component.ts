import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseDeleteComponent } from "src/app/core/interface/base-delete.component";

@Component({
  selector: "app-artifact-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.css"],
})
export class DeleteArtifactComponent
  extends BaseDeleteComponent
  implements OnInit
{
  constructor(private route: ActivatedRoute) {
    super();
  }

  getServiceURL(): string {
    return "artifacts";
  }

  getRouterURL(): string {
    return "artifacts";
  }

  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }

  getFormControls(): Object {
    return {
      id: new FormControl(undefined, []),
      name: new FormControl(undefined, [Validators.required]),
      description: new FormControl(undefined, []),
      file: new FormControl(undefined, [Validators.required]),
      event: new FormControl(this.service.getUser().event, []),
      owner: new FormControl(this.service.getUser().data_user.id, []),
    };
  }
}
