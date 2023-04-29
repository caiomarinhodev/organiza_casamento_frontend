import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { param } from 'cypress/types/jquery';
import { BaseComponent } from 'src/app/core/interface/base.component';
import { UserService } from 'src/app/service/user/user.service';
import { CustomValidators } from 'src/app/shared/validator/custom-validators';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent extends BaseComponent implements OnInit {

  changeForm: FormGroup;

  loading = false;

  token = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute,
    vcr: ViewContainerRef,
    private translate: TranslateService) {
    super();
    this.changeForm = this.formBuilder.group(
      {
        password: new FormControl(undefined, [Validators.required,
        Validators.minLength(5), Validators.required, Validators.maxLength(255)]),
        retype_password: new FormControl(undefined, [Validators.required,
        Validators.minLength(5), Validators.required, Validators.maxLength(255)])
      }
    );
  }

  override ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(params);
    });
  }

  onSubmit(): void {
    if (this.changeForm.value['password'] !== this.changeForm.value['retype_password']) {
      this.notification.error(this.translate.instant('ERROR_PASSWORD_NOT_MATCH'));
      return;
    }
    this.loading = true;
    this.userService.changePassword(this.token, this.changeForm.value['password']).subscribe(
      result => {
        this.loading = false;
        this.notification.successText(this.translate.instant('CHANGE_PASSWORD_SUCCESS'));
        this.navigate(['/login']);
      },
      err => {
        this.loading = false;
        this.notification.error(this.translate.instant('ERROR_CHANGE_PASSWORD'));
      }
    );
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