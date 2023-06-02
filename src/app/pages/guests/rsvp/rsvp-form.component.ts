import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseEditComponent } from "src/app/core/interface/base-edit.component";
import { CommonService } from "src/app/service/common/common.service";

@Component({
  selector: "app-rsvp-form",
  templateUrl: "./rsvp-form.component.html",
  styleUrls: ["./rsvp-form.component.css"],
})
export class FormRSVPComponent extends BaseEditComponent implements OnInit {
  hash: string | null = null;
  id: string | null = null;

  constructor(
    vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {
    super();
    //get id (uuid) from route and parse uuid to id and set this.id
    this.route.queryParams.subscribe((params) => {
      this.hash = decodeURIComponent(params["hash"]);
      if (this.hash) {
        this.id = this.commonService.parseHash(String(this.hash));
      }
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override handleUpdate(result: any): void {
    this.postUpdate();
    this.notification.successText("RSVP enviado com sucesso!");
  }

  protected override getItem(): void {
    this.loading = true;
    if (this.id && this.id !== "null") {
      this.service.getOne(this.getServiceURL(), this.id).subscribe(
        (result) => {
          this.item = result;
          this.postGetItem();
          this.loading = false;
        },
        (error) => {
          this.notification.error(error);
          this.loading = false;
        }
      );
    }
  }

  protected override preUpdate(): void {
      this.item.is_received = true;
      this.editForm.controls["is_received"].setValue(true);
  }

  markAsReceived(): void {
    if (this.id && this.id !== "null") {
      let form = this.item;
      form.is_received = true;
      this.service
    .updatePartial(this.getServiceURL(), this.id, form)
        .subscribe(
          (result) => {
            this.notification.successText("RSVP recebido com sucesso!");
            this.item = result;
            this.postGetItem();
            this.loading = false;
          },
          (error) => {
            this.notification.error(error);
            this.loading = false;
          }
        );
    }
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
      is_received: new FormControl(true, []),
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
}
