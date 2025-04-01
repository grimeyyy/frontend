import {Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {ModalWrapperComponent} from './modal-wrapper/modal-wrapper.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), children: [
      {path: 'login', component: ModalWrapperComponent, data: {component: LoginComponent}},
      {path: 'sign-up', component: ModalWrapperComponent, data: {component: SignUpComponent}},
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'home'} // 404-Fallback
];
