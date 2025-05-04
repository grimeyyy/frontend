import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {BaseAuthFormComponent} from '../base-auth-form/base-auth-form.component';
import {FormLink} from '../../../shared/interfaces/form-link.interface';
import {FormField} from '../../../shared/interfaces/form-field.interface';
import {passwordMatchValidator} from '../../../shared/validators/password-match';
import {BaseAuthComponent} from '../base-auth/base-auth.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BaseAuthFormComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent extends BaseAuthComponent {
  override formGroup: FormGroup;
  override formFields: FormField[];
  override formLinks: FormLink[];

  public email: string = '';
  protected readonly passwordMatchValidator = passwordMatchValidator;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    super();

    this.formGroup = this.fb.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, {validators: [passwordMatchValidator]});

    this.formFields = [
      {id: 'emailSignUp', name: 'email', label: 'Email', type: 'email', translateKey: 'LOGIN_SIGNUP.EMAIL'},
      {id: 'passwordSignUp', name: 'password', label: 'Password', type: 'password', translateKey: 'LOGIN_SIGNUP.PASSWORD'},
      {id: 'confirmPasswordSignUp', name: 'confirmPassword', label: 'Confirm password', type: 'password', translateKey: 'LOGIN_SIGNUP.CONFIRM_PASSWORD'}
    ];

    this.formLinks = [
      {helpText: 'LOGIN_SIGNUP.ALREADY_SIGNED_UP', href: "/login", linkText: 'LOGIN_SIGNUP.LOGIN'},
    ]
  }

  override onSubmit() {
    const {email, password} = this.formGroup.value;
    this.email = email;
    this.authService.signUp({email, password}).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        // this.router.navigate(['/email-sent'], {queryParams: {email}});
      },
      error: err => this.errorMessage = err.error.message,
    });
  }


}
