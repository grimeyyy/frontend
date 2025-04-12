import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {FormField} from '../../utils/interfaces/form-field.interface';
import {FormLink} from '../../utils/interfaces/form-link.interface';
import {GenericFormComponent} from '../../utils/generic-form/generic-form.component';
import {BaseAuthComponent} from '../base-auth/base-auth.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GenericFormComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent extends BaseAuthComponent {
  override formGroup: FormGroup;
  override formFields: FormField[];
  override formLinks: FormLink[];

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    super();

    this.formGroup = this.fb.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.formFields = [
      {id: 'emailForgotPassword', name: 'email', label: 'Email', type: 'email', translateKey: 'LOGIN_SIGNUP.EMAIL'},
    ]

    this.formLinks = [
      {helpText: 'LOGIN_SIGNUP.REMEMBER_PASSWORD', href: "/login", linkText: 'LOGIN_SIGNUP.LOGIN'},
    ]
  }

  override onSubmit() {
    const email = this.formGroup.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        setTimeout(() => this.router.navigate(['/email-sent'], {queryParams: {email}}), 5000);
      },
      error: err => this.errorMessage = err.error.message,
    })
  }

}
