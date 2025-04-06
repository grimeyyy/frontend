import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.nonNullable.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  ngOnInit(): void {
    // Token aus URL auslesen
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    // Falls kein Token vorhanden ist, zeige eine Fehlermeldung an
    if (!this.token) {
      this.errorMessage = 'Ungültiger oder fehlender Reset-Token.';
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
      next: () => {
        alert('Passwort erfolgreich zurückgesetzt! Du kannst dich jetzt einloggen.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Zurücksetzen des Passworts.';
      }
    });
  }
}
