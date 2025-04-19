import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../shared/services/auth.service';
import {ThemeService} from '../../shared/services/theme.service';
import {filter} from 'rxjs';

interface NavigationItem {
  label: string;
  path?: string;
  icon: string;
  authRequired?: boolean;
  children?: NavigationItem[];
}

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    NgClass,
    NgForOf,

  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class MainLayoutComponent implements OnInit {
  currentTheme: string = 'auto';
  userAvatarUrl: string = 'assets/img/avatar-dummy.png';
  currentRoute: string = '';

  navigationItems: NavigationItem[] = [
    {
      path: '/home',
      icon: 'bi-house-fill',
      label: 'NAVIGATION.HOME'
    },
    {
      icon: 'bi-speedometer2',
      label: 'Dashboards',
      children: [
        {path: '/dashboards/default', icon: '', label: 'Default'},
        {path: '/dashboards/crypto', icon: '', label: 'Crypto', authRequired: true},
        {path: '/dashboards/saas', icon: '', label: 'SaaS'}
      ]
    },
    {
      icon: 'bi-people',
      label: 'Customers',
      children: [
        {path: '/customers/list', icon: '', label: 'Customers'},
        {path: '/customers/detail', icon: '', label: 'Customer details'},
        {path: '/customers/new', icon: '', label: 'New customer'}
      ]
    }
  ];

  constructor(private authService: AuthService, private themeService: ThemeService, private router: Router) {

  }

  ngOnInit(): void {
    this.themeService.initializeTheme();
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
    this.currentRoute = this.router.url;
  }

  toggleTheme(theme: string): void {
    this.themeService.toggleTheme(theme);
  }

  get visibleItems(): NavigationItem[] {
    const isLoggedIn = this.authService.isAuthenticated();

    return this.navigationItems
      .filter(item => {
        if (item.authRequired && !isLoggedIn) {
          return false;
        }
        if (item.children) {
          item.children = item.children.filter(child => {
            return !child.authRequired || isLoggedIn;
          });
          if (item.children.length === 0 && !item.path) {
            return false;
          }
        }
        return true;
      });
  }

  get isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    void this.router.navigate(['/home']);
  }

  isGroupActive(children: NavigationItem[]): boolean {
    if (!this.currentRoute) return false;
    return children.some(child =>
      !!child.path && this.currentRoute.startsWith(child.path)
    );
  }

}
