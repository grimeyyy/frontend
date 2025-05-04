import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }


  logout() {
    this.authService.logout();
  }
}
