import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TranslatePipe} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-email-sent',
  imports: [
    TranslatePipe,
    NgIf
  ],
  templateUrl: './email-sent.component.html',
  styleUrl: './email-sent.component.scss'
})
export class EmailSentComponent implements OnInit {
  email: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    let emailSet = false;

    this.route.queryParamMap.subscribe(params => {
      const emailParam = params.get('email');

      if (emailParam && !emailSet) {
        this.email = emailParam;
        emailSet = true;

        void this.router.navigate([], {
          queryParams: {email: null},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
      if (!this.email) {
        setTimeout(() => this.router.navigate(['/login']), 3000);
      }
    });
  }

  resendVerificationEmail(): void {
    this.authService.resendVerificationEmail(this.email).subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }


}
