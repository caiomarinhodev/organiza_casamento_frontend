import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/interface/base.component';
import { UserService } from 'src/app/service/user/user.service';
import { CustomValidators } from 'src/app/shared/validator/custom-validators';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent extends BaseComponent implements OnInit {

  resetForm: FormGroup;

  loading = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute,
    vcr: ViewContainerRef,
    private translate: TranslateService) {
    super();
    this.resetForm = this.formBuilder.group(
      {
        email: new FormControl(undefined, [Validators.required, CustomValidators.noWhitespaceValidator, Validators.email]),
      }
    );
  }

  override ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.userService.resetPassword(this.resetForm.value['email']).subscribe(
      result => {
        this.loading = false;
        this.notification.successText(this.translate.instant('RESET_PASSWORD_SUCCESS'));
        this.navigate(['/login']);
      },
      err => {
        this.loading = false;
        this.notification.error(this.translate.instant('ERROR_RESET_PASSWORD'));
      });
  }


  back() {
    this.navigate(['/login']);
  }

  getServiceURL(): string {
    return '';
  }

  getRouterURL(): string {
    return '';
  }


}

