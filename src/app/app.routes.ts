import {Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  {path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
  {path: 'signup', loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent)},
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },

  {path: '**', redirectTo: 'home'} // 404-Fallback
];
