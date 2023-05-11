import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseEditComponent } from "src/app/core/interface/base-edit.component";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateProfileComponent
  extends BaseEditComponent
  implements OnInit
{
  constructor(private route: ActivatedRoute) {
    super();
  }

  override getFormControls(): Object {
    return {
      username: new FormControl(undefined, []),
      first_name: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(3),
      ]),
      last_name: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(undefined, []),
      photo: new FormControl(undefined, []),
      cep: new FormControl(undefined, []),
      address: new FormControl(undefined, []),
      number: new FormControl(undefined, []),
      complement: new FormControl(undefined, []),
      district: new FormControl(undefined, []),
      city: new FormControl(undefined, []),
      state: new FormControl(undefined, []),
      phone: new FormControl(undefined, [Validators.minLength(9)]),
      cpf: new FormControl(undefined, [Validators.minLength(10)]),
      birthdate: new FormControl(undefined, []),
    };
  }

  protected override postGetItem(): void {
    //receive item and fill form set values
    this.editForm.controls["username"].setValue(
      this.item.custom_user.user.username
    );
    this.editForm.controls["first_name"].setValue(
      this.item.custom_user.user.first_name
    );
    this.editForm.controls["last_name"].setValue(
      this.item.custom_user.user.last_name
    );
    this.editForm.controls["email"].setValue(this.item.custom_user.user.email);
    this.editForm.controls["photo"].setValue(this.item.custom_user.photo);
    this.editForm.controls["cep"].setValue(this.item.custom_user.cep);
    this.editForm.controls["address"].setValue(this.item.custom_user.address);
    this.editForm.controls["number"].setValue(this.item.custom_user.number);
    this.editForm.controls["complement"].setValue(
      this.item.custom_user.complement
    );
    this.editForm.controls["district"].setValue(this.item.custom_user.district);
    this.editForm.controls["city"].setValue(this.item.custom_user.city);
    this.editForm.controls["state"].setValue(this.item.custom_user.state);
    this.editForm.controls["phone"].setValue(this.item.phone);
    this.editForm.controls["cpf"].setValue(this.item.cpf);
    this.editForm.controls["birthdate"].setValue(this.item.birthdate);
  }

  getCorrectFormValue(): Object {
    return {
      custom_user: {
        user: {
          username: this.editForm.controls["username"].value,
          first_name: this.editForm.controls["first_name"].value,
          last_name: this.editForm.controls["last_name"].value,
          email: this.editForm.controls["email"].value,
        },
        cep: this.editForm.controls["cep"].value,
        address: this.editForm.controls["address"].value,
        number: this.editForm.controls["number"].value,
        complement: this.editForm.controls["complement"].value,
        district: this.editForm.controls["district"].value,
        city: this.editForm.controls["city"].value,
        state: this.editForm.controls["state"].value,
      },
      phone: this.editForm.controls["phone"].value,
      cpf: this.editForm.controls["cpf"].value,
      birthdate: this.editForm.controls["birthdate"].value,
    };
  }

  protected override update(): void {
    this.service
      .update(this.getServiceURL(), this.item.id, this.getCorrectFormValue())
      .subscribe(
        (result) => {
          console.log(result);
          this.submitting = false;
          this.handleUpdate(result);
        },
        (error) => {
          console.log(error);
          this.submitting = false;
          this.notification.error(
            error.error ? error.error.message : error.message
          );
        }
      );
  }

  getServiceURL(): string {
    return "noivo";
  }

  getRouterURL(): string {
    let id = this.route.snapshot.paramMap.get("id");
    return "profile/" + id;
  }

  protected override backToList(): void {
    this.router.navigate(["/"]);
  }

  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }
}
