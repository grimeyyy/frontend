import {Component, Output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import EventEmitter from 'node:events';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    TranslateModule,
    RouterLink,
    FormsModule,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery: string = '';

  // @Output() search = new EventEmitter<{ query: string }>();
  //
  onSubmit(event: Event): void {
  //   event.preventDefault();
  //   this.search.emit({ query: this.searchQuery });
  }

}
