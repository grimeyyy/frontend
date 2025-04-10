import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {FormField} from '../../utils/interfaces/form-field.interface';
import {FormLink} from '../../utils/interfaces/form-link.interface';
import {GenericFormComponent} from '../../utils/generic-form/generic-form.component';
import {passwordMatchValidator} from '../../utils/validators/password-match';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, GenericFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public successMessage: string = '';
  public errorMessage: string = '';
  public loginForm: FormGroup;
  public loginFields: Array<FormField> = [];
  public loginLinks: Array<FormLink> = [];

  public loggedIn = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginFields = [
      {id: 'emailLogin', name: 'email', label: 'Email', type: 'email', translateKey: 'LOGIN_SIGNUP.EMAIL'},
      {id: 'passwordLogin', name: 'password', label: 'Password', type: 'password', translateKey: 'LOGIN_SIGNUP.PASSWORD'}
    ];

    this.loginLinks = [
      {helpText: 'LOGIN_SIGNUP.NO_ACCOUNT', href: "/sign-up", linkText: 'LOGIN_SIGNUP.SIGNUP_HERE'},
      {helpText: 'LOGIN_SIGNUP.FORGOT_PASSWORD', href: "/forgot-password", linkText: 'LOGIN_SIGNUP.RESET_PASSWORD'},
    ]
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        void this.router.navigate(['/dashboard']);
        this.loggedIn = true;
      },
      error: err => this.errorMessage = err.error.message,
    });
  }

  protected readonly passwordMatchValidator = passwordMatchValidator;
}
