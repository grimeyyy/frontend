import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {FormField} from '../../utils/interfaces/form-field.interface';
import {FormLink} from '../../utils/interfaces/form-link.interface';
import {GenericFormComponent} from '../../utils/generic-form/generic-form.component';
import {passwordMatchValidator} from '../../utils/validators/password-match';

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
export class ForgotPasswordComponent {
  public errorMessage: string = '';
  public successMessage: string = '';
  public forgotPasswordForm: FormGroup;
  public forgotPasswordFields: Array<FormField> = [];
  public forgotPasswordLinks: Array<FormLink> = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.formBuilder.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.forgotPasswordFields = [
      {id: 'emailForgotPassword', name: 'email', label: 'Email', type: 'email', translateKey: 'LOGIN_SIGNUP.EMAIL'},
    ]

    this.forgotPasswordLinks = [
      {helpText: 'LOGIN_SIGNUP.REMEMBER_PASSWORD', href: "/login", linkText: 'LOGIN_SIGNUP.LOGIN'},
    ]
  }

  onSubmit() {
    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        setTimeout(() => this.router.navigate(['/email-sent'], {queryParams: {email}}), 5000);
      },
      error: err => this.errorMessage = err.error.message,
    })
  }

  protected readonly passwordMatchValidator = passwordMatchValidator;
}
