import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslatePipe, NgbAlert],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public errorMessage = '';
  public loginForm: FormGroup;

  public loggedIn = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
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



  onForgotPassword() {
    const email = this.loginForm.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        // alert('Password reset email sent!');
      },
      error: (err) => {
        // alert('Error sending reset email!');
      }
    });
  }
}
