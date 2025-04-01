import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslatePipe, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
