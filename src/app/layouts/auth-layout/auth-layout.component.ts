import { Component } from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavigationComponent} from '../../navigation/navigation.component';

@Component({
  selector: 'app-auth-layout',
  imports: [
    HeaderComponent,
    RouterOutlet,
    NavigationComponent,
    RouterLink
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
