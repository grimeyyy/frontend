import {Component, Input} from '@angular/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-generic-alert',
  imports: [
    NgbAlert,
    TranslatePipe
  ],
  templateUrl: './generic-alert.component.html',
  styleUrl: './generic-alert.component.scss'
})
export class GenericAlertComponent {
  @Input() type: 'success' | 'warning' | 'danger' | 'info' = 'info';
  @Input() message: string = '';
  @Input() args: {[p:string]: string} = {};
}
