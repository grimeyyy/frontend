import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from "@ngx-translate/core";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgbAlert
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  public errorMessage: string = '';
  public successMessage: string = '';
  public forgotPasswordForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.formBuilder.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        setTimeout(() => this.router.navigate(['/email-sen'], {queryParams: {email}}), 5000);
      },
      error: err => this.errorMessage = err.error.message,
    })
  }

}
