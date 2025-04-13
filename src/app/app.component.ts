import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {IdleService} from './services/idle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private idleService: IdleService) {
  }
}
