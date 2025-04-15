import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {FormField} from '../../../shared/interfaces/form-field.interface';
import {FormLink} from '../../../shared/interfaces/form-link.interface';
import {BaseAuthFormComponent} from '../base-auth-form/base-auth-form.component';
import {BaseAuthComponent} from '../base-auth/base-auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, BaseAuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseAuthComponent implements OnInit {
  override formGroup: FormGroup;
  override formFields: FormField[];
  override formLinks: FormLink[];

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    super();

    this.formGroup = this.fb.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.formFields = [
      {id: 'emailLogin', name: 'email', label: 'Email', type: 'email', translateKey: 'LOGIN_SIGNUP.EMAIL'},
      {
        id: 'passwordLogin',
        name: 'password',
        label: 'Password',
        type: 'password',
        translateKey: 'LOGIN_SIGNUP.PASSWORD'
      }
    ];

    this.formLinks = [
      {helpText: 'LOGIN_SIGNUP.NO_ACCOUNT', href: "/sign-up", linkText: 'LOGIN_SIGNUP.SIGNUP_HERE'},
      {helpText: 'LOGIN_SIGNUP.FORGOT_PASSWORD', href: "/forgot-password", linkText: 'LOGIN_SIGNUP.RESET_PASSWORD'},
    ]
  }

  override onSubmit() {
    this.authService.login(this.formGroup.value).subscribe({
      next: () => {
        void this.router.navigate(['/dashboards/default']);
      },
      error: err => this.errorMessage = err.error.message,
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const reason = params.get('reason');
      if (reason === 'session-expired') {
        this.errorMessage = 'ERROR.SESSION_EXPIRED';
      }
    });
  }

}
