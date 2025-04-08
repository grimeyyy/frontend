import {Component, inject, TemplateRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    NgIf,
    NgbAlert,
    ReactiveFormsModule,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private modalService = inject(NgbModal);
  public errorMessage = '';
  public signUpForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = formBuilder.nonNullable.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true});
  }

  onSubmit() {
    const {email, password} = this.signUpForm.value;
    this.authService.signUp({email, password}).subscribe({
      next: () => {
        this.router.navigate(['/email-sent'], {queryParams: {email}});
      },
      error: err => this.errorMessage = err.error.message,

    });
  }

}
