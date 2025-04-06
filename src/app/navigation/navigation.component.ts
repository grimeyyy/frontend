import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    NgStyle,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent  implements OnInit {
  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }

  toggleTheme(theme: string): void {
    this.themeService.toggleTheme(theme);
  }
}
