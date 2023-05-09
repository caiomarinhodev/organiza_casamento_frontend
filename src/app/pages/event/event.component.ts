import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { FormControl, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { BaseEditComponent } from "src/app/core/interface/base-edit.component";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent extends BaseEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {
    super();
    this.translate = translate;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override getFormControls(): Object {
    return {
      id: new FormControl(undefined, []),
      name: new FormControl(undefined, [Validators.required]),
      date: new FormControl(undefined, [Validators.required]),
      // name_bride: new FormControl(undefined, [Validators.required]),
      // birthdate_bride: new FormControl(undefined, [Validators.required]),
      // name_groom: new FormControl(undefined, [Validators.required]),
      // birthdate_groom: new FormControl(undefined, [Validators.required]),
      size: new FormControl(undefined, [Validators.required]),
      style: new FormControl(undefined, [Validators.required]),
      budget: new FormControl(undefined, [Validators.required]),
      guests: new FormControl(undefined, [Validators.required]),
    };
  }

  getServiceURL(): string {
    return "event";
  }
  getRouterURL(): string {
    return "event";
  }

  protected override backToList(): void {
    this.navigate(["/"]);
  }

  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }

  protected override postGetItem(): void {
    console.log("Evento", this.item);
    delete this.item.created_at;
    delete this.item.groom;
    delete this.item.bride;
    delete this.item.updated_at;
    this.editForm.setValue(this.item);
  }
}
