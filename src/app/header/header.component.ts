import {Component, ElementRef, Output, ViewChild} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import EventEmitter from 'node:events';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    TranslateModule,
    RouterLink,
    FormsModule,
    NgIf,
    NgOptimizedImage,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchQuery: string = '';
  userAvatarUrl: string = 'assets/img/avatar-dummy.png';
  username: string = 'some admin username';

  constructor(private authService: AuthService) {
  }

  get isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  // @Output() search = new EventEmitter<{ query: string }>();
  //
  onSubmit(event: Event): void {
  //   event.preventDefault();
  //   this.search.emit({ query: this.searchQuery });
  }




}
