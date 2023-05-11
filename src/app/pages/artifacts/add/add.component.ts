import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseCreateComponent } from "src/app/core/interface/base-create.component";

@Component({
  selector: "app-add-guests",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddArtifactComponent
  extends BaseCreateComponent
  implements OnInit
{
  /**
   * Constructor.
   *
   * @param {ActivatedRoute} route
   * @param {TagsUtilService} tagsUtilService
   */

  file: any;
  fileHolder: File | null;

  constructor(private route: ActivatedRoute) {
    super();
    this.fileHolder = null;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
    }
  }

  createFormData() {
    if (this.createForm.valid && this.fileHolder && this.fileHolder.name) {
      const formData: FormData = new FormData();
      formData.append("file", this.fileHolder, this.fileHolder.name);
      formData.append("name", this.createForm.value.name);
      formData.append("description", this.createForm.value.description);
      formData.append("event", this.createForm.value.event);
      formData.append("owner", this.createForm.value.owner);
      console.log(formData);
      return formData;
    }
    return {};
  }

  protected override insert(): void {
    this.service.insert(this.getServiceURL(), this.createFormData()).subscribe(
      (result) => {
        this.submitting = false;
        this.postInsert(result);
        if (this.customInsertMessage != null) {
          this.notification.successText(this.customInsertMessage);
        } else {
          this.notification.insertSuccess();
        }
        this.backToList();
      },
      (error) => {
        this.submitting = false;
        if (error.status !== 0) {
          this.notification.error(
            error.error ? error.error.message : error.message
          );
        }
      }
    );
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
      description: new FormControl(undefined, []),
      file: new FormControl(undefined, [Validators.required]),
      event: new FormControl(this.service.getUser().event, []),
      owner: new FormControl(this.service.getUser().data_user.id, []),
    };
  }

  /**
   * Gets the service URL.
   *
   * @returns {string}
   * @override
   */
  getServiceURL(): string {
    return "artifacts";
  }

  /**
   * Gets the router URL>
   *
   * @returns {string}
   * @override
   */
  getRouterURL(): string {
    return "artifacts";
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
