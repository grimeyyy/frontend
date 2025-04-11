import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {GenericFormComponent} from '../../utils/generic-form/generic-form.component';
import {FormLink} from '../../utils/interfaces/form-link.interface';
import {FormField} from '../../utils/interfaces/form-field.interface';
import {passwordMatchValidator} from '../../utils/validators/password-match';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GenericFormComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public email: string = '';
  public successMessage: string = '';
  public errorMessage: string = '';
  public signUpForm: FormGroup;
  public signUpFields: Array<FormField> = [];
  public signUpLinks: Array<FormLink> = [];
  protected readonly passwordMatchValidator = passwordMatchValidator;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, {validators: [passwordMatchValidator]});

    this.signUpFields = [
      {id: 'emailSignUp', name: 'email', label: 'Email', type: 'email', translateKey: 'LOGIN_SIGNUP.EMAIL'},
      {id: 'passwordSignUp', name: 'password', label: 'Password', type: 'password', translateKey: 'LOGIN_SIGNUP.PASSWORD'},
      {id: 'confirmPasswordSignUp', name: 'confirmPassword', label: 'Confirm password', type: 'password', translateKey: 'LOGIN_SIGNUP.CONFIRM_PASSWORD'}
    ];

    this.signUpLinks = [
      {helpText: 'LOGIN_SIGNUP.ALREADY_SIGNED_UP', href: "/login", linkText: 'LOGIN_SIGNUP.LOGIN'},
    ]
  }

  onSubmit() {
    const {email, password} = this.signUpForm.value;
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
