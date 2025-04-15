import {Component} from '@angular/core';
import {ActiveHashLinkDirective} from '../../../shared/directives/active-hash-link.directive';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-account-settings',
  imports: [
    ActiveHashLinkDirective,
    RouterLink
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {

}
