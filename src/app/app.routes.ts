import {Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
      {
        path: 'dashboards/default',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'account/overview',
        loadComponent: () =>
          import('./pages/account/account-overview/account-overview.component').then(m => m.AccountOverviewComponent)
      },
      {
        path: 'account/settings',
        loadComponent: () =>
          import('./pages/account/account-settings/account-settings.component').then(m => m.AccountSettingsComponent)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)},
      {path: 'sign-up', loadComponent: () => import('./pages/auth/sign-up/sign-up.component').then(m => m.SignUpComponent)},
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
      {
        path: 'email-sent',
        loadComponent: () => import('./pages/auth/email-sent/email-sent.component').then(m => m.EmailSentComponent)
      },
      {
        path: 'verify-email',
        loadComponent: () => import('./pages/auth/verify-email/verify-email.component').then(m => m.VerifyEmailComponent)
      }
    ]
  },
  {path: '**', redirectTo: 'home'}
];
