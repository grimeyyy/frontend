import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [
    TranslateModule,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }

  toggleTheme(theme: string): void {
    this.themeService.toggleTheme(theme);
  }
}
