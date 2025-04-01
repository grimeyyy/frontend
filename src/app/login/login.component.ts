import {Component, inject, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
  private modalService = inject(NgbModal);

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }


  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.errorMessage = 'LOGIN.WRONG_CREDENTIALS',
    });
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
