import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {passwordMatchValidator} from '../../utils/validators/password-match';
import {FormField} from '../../utils/interfaces/form-field.interface';
import {FormLink} from '../../utils/interfaces/form-link.interface';
import {GenericFormComponent} from '../../utils/generic-form/generic-form.component';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    GenericFormComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  private token: string = '';
  public successMessage: string = '';
  public errorMessage: string = '';
  public resetPasswordForm: FormGroup;
  public resetPasswordFields: Array<FormField> = [];
  public resetPasswordLinks: Array<FormLink> = [];
  protected readonly passwordMatchValidator = passwordMatchValidator;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.nonNullable.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }, {validators: [passwordMatchValidator]});

    this.resetPasswordFields = [
      {id: 'passwordResetPassword', name: 'password', label: 'New password', type: 'password', translateKey: 'LOGIN_SIGNUP.PASSWORD'},
      {id: 'confirmPasswordResetPassword', name: 'confirmPassword', label: 'Confirm new password', type: 'password', translateKey: 'LOGIN_SIGNUP.CONFIRM_PASSWORD'}
    ]

    this.resetPasswordLinks = [
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

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) return;

    const newPassword = this.resetPasswordForm.value.newPassword;
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
