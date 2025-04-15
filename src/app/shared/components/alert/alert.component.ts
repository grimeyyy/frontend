import {Component, Input} from '@angular/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  imports: [
    NgbAlert,
    TranslatePipe
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() type: 'success' | 'warning' | 'danger' | 'info' = 'info';
  @Input() message: string = '';
  @Input() args: {[p:string]: string} = {};
}
