import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  imports: [
    TranslatePipe
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
  message = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.authService.verifyEmail(token)
        .subscribe({
          next: (response) => {
            this.message = response.message;
            // redirect after 5 seconds
            setTimeout(() => this.router.navigate(['/login']), 5000);
          },
          error: (err) => {
            this.message = err.error.message || 'ERROR.VERIFICATION_FAILED';
          }
        });
    } else {
      this.message = 'ERROR.NO_TOKEN_PROVIDED';
    }
  }
}
