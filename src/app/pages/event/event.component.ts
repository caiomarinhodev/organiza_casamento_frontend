import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { FormControl, Validators } from "@angular/forms";
import { BaseEditComponent } from "src/app/core/interface/base-edit.component";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent extends BaseEditComponent implements OnInit {
  color1: string = "#ffffff";

  color2: string = "#000000";

  color3: string = "#ffffff";

  color4: string = "#0082ff";

  constructor(
    private route: ActivatedRoute,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  

  fillColors(): void {
    console.log("fillColors", this.item);
    if (this.item.color1) {
      this.color1 = this.item.color1;
    }
    if (this.item.color2) {
      this.color2 = this.item.color2;
    }
    if (this.item.color3) {
      this.color3 = this.item.color3;
    }
    if (this.item.color4) {
      this.color4 = this.item.color4;
    }
  }

  setColorsOnForm(): void {
    console.log(
      "setColorsOnForm",
      this.color1,
      this.color2,
      this.color3,
      this.color4
    );
    this.editForm.controls["color1"].setValue(this.color1);
    this.editForm.controls["color2"].setValue(this.color2);
    this.editForm.controls["color3"].setValue(this.color3);
    this.editForm.controls["color4"].setValue(this.color4);
  }

  protected override preUpdate(): void {
    this.setColorsOnForm();
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
      observation: new FormControl(undefined, [Validators.required]),
      color1: new FormControl(undefined, [Validators.required]),
      color2: new FormControl(undefined, [Validators.required]),
      color3: new FormControl(undefined, [Validators.required]),
      color4: new FormControl(undefined, [Validators.required]),
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
    console.log("[event] Evento", this.item);
    delete this.item.created_at;
    delete this.item.groom;
    delete this.item.bride;
    delete this.item.updated_at;
    this.editForm.setValue(this.item);
    this.fillColors();
  }
}
