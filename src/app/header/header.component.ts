import {Component} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {LoginComponent} from '../login/login.component';
import {SignUpComponent} from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  imports: [
    TranslateModule,
    LoginComponent,
    SignUpComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
