import {Component, inject, TemplateRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {NgIf} from '@angular/common';
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    NgIf,
    NgbAlert,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private modalService = inject(NgbModal);
  public errorMessage = '';
  public signUpForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService) {
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
    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    const {email, password} = this.signUpForm.value;
    this.authService.signUp({email, password}).subscribe({
      next: (response) => {
        console.log(response);
        // this.errorMessage = 'Registrierung erfolgreich!';
      },
      error: (err) => {
        // this.errorMessage = 'Fehler: ' + (err.error || 'Registrierung fehlgeschlagen');
      }
    });
  }

  closeModal() {
    this.modalService.dismissAll()
  }

}
