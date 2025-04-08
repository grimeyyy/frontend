import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    NgIf,
    TranslatePipe,
    NgbAlert
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.nonNullable.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.errorMessage = 'ERROR.INVALID_OR_EXPIRED_TOKEN';
      return;
    }


  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
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
