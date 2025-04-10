import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-email-sent',
  imports: [],
  templateUrl: './email-sent.component.html',
  styleUrl: './email-sent.component.scss'
})
export class EmailSentComponent implements OnInit {
  email: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email') ?? '';

      if (this.email) {
        setTimeout(() => {
          void this.router.navigate([], {
            queryParams: { email: null },
            queryParamsHandling: 'merge',
            skipLocationChange: true
          });
        }, 200);
      }
    });
  }

  resendEmail() {
    this.authService.resendVerificationEmail(this.email);
  }


}
