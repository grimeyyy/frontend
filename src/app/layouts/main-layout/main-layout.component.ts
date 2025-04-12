import { Component } from '@angular/core';
import {HeaderComponent} from '../layout-components/header/header.component';
import {NavigationComponent} from '../layout-components/navigation/navigation.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    NavigationComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
