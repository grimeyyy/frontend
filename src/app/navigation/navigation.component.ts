import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    NgStyle,
    RouterLinkActive,
    TranslatePipe,
    NgClass,
    NgForOf
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent  implements OnInit {
  navigationItems = [
    { path: '/home', icon: 'bi-house-door', label: 'NAVIGATION.HOME' },
    { path: '/dashboard', icon: 'bi-speedometer2', label: 'NAVIGATION.DASHBOARD', authRequired: true },
    { path: '/users', icon: 'bi-people', label: 'Users', authRequired: true },
    { path: '/reports', icon: 'bi-file-earmark-bar-graph', label: 'Reports', authRequired: true }
  ];

  constructor(private authService: AuthService, private themeService: ThemeService) {
  }

  get visibleItems() {
    const isLoggedIn = this.authService.isAuthenticated();
    return this.navigationItems.filter(item => !item.authRequired || isLoggedIn);
  }

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }

  toggleTheme(theme: string): void {
    this.themeService.toggleTheme(theme);
  }
}
