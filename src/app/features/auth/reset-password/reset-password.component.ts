import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {passwordMatchValidator} from '../../../shared/validators/password-match';
import {FormField} from '../../../shared/interfaces/form-field.interface';
import {FormLink} from '../../../shared/interfaces/form-link.interface';
import {BaseAuthFormComponent} from '../base-auth-form/base-auth-form.component';
import {BaseAuthComponent} from '../base-auth/base-auth.component';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    BaseAuthFormComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent extends BaseAuthComponent implements OnInit {
  override formGroup: FormGroup;
  override formFields: FormField[];
  override formLinks: FormLink[];

  private token: string = '';
  protected readonly passwordMatchValidator = passwordMatchValidator;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    super();

    this.formGroup = this.fb.nonNullable.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }, {validators: [passwordMatchValidator]});

    this.formFields = [
      {id: 'passwordResetPassword', name: 'password', label: 'New password', type: 'password', translateKey: 'LOGIN_SIGNUP.PASSWORD'},
      {id: 'confirmPasswordResetPassword', name: 'confirmPassword', label: 'Confirm new password', type: 'password', translateKey: 'LOGIN_SIGNUP.CONFIRM_PASSWORD'}
    ]

    this.formLinks = [
      {helpText: 'LOGIN_SIGNUP.REMEMBER_PASSWORD', href: "/login", linkText: 'LOGIN_SIGNUP.LOGIN'},
    ]
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.errorMessage = 'ERROR.INVALID_OR_EXPIRED_TOKEN';
      return;
    }
  }

  override onSubmit(): void {
    if (this.formGroup.invalid) return;

    const newPassword = this.formGroup.value.newPassword;
    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        // redirect after 5 seconds
        setTimeout(() => this.router.navigate(['/login']), 5000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'ERROR.VERIFICATION_FAILED';
      }
    });
  }


}
