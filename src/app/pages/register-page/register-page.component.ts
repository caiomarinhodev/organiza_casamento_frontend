import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/interface/base.component';
import { UserService } from 'src/app/service/user/user.service';
import { CustomValidators } from 'src/app/shared/validator/custom-validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.less']
})
export class RegisterPageComponent extends BaseComponent implements OnInit {

  registerForm: FormGroup;

  loading = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute,
    vcr: ViewContainerRef,
    private translate: TranslateService) {
    super();
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl(undefined, [Validators.required, CustomValidators.noWhitespaceValidator]),
        email: new FormControl(undefined, [Validators.required, CustomValidators.noWhitespaceValidator, Validators.email]),
        password: new FormControl(undefined, [Validators.required,
        Validators.minLength(5), Validators.required, Validators.maxLength(255)]),
        retype_password: new FormControl(undefined, [Validators.required,
        Validators.minLength(5), Validators.required, Validators.maxLength(255)])
      }
    );
  }

  override ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.value['password'] !== this.registerForm.value['retype_password']) {
      this.notification.error(this.translate.instant('ERROR_PASSWORD_NOT_MATCH'));
      return;
    }
    this.register(this.registerForm.value['username'], this.registerForm.value['email'], this.registerForm.value['password']);
  }

  register(username: any, email: any, password: any): void {
    this.loading = true;
    this.userService.register(username, email, password).subscribe(
      result => {
        this.loading = false;
        this.notification.successText(this.translate.instant('USER_REGISTERED'));
        this.navigate(['/login']);
      },
      err => {
        this.loading = false;
        if (err.status === 400) {
          this.notification.error(this.translate.instant('ERROR_USER_ALREADY_EXISTS'));
        } else {
          this.notification.error(this.translate.instant('ERROR_REGISTER'));
        }
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
