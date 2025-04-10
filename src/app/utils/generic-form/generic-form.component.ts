import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {GenericAlertComponent} from '../generic-alert/generic-alert.component';
import {RouterLink} from '@angular/router';
import {FormLink} from '../interfaces/form-link.interface';
import {FormField} from '../interfaces/form-field.interface';

@Component({
  selector: 'app-generic-form',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    GenericAlertComponent,
    NgIf,
    RouterLink,
    NgStyle
  ],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss'
})
export class GenericFormComponent implements OnInit {
  @Input() maxWidthRem: number = 25;
  @Input() heading: string = '';
  @Input() formGroup!: FormGroup;
  @Input() fields: Array<FormField> = [];
  @Input() formValidators: ValidatorFn[] = [];
  @Input() submitText: string = 'GENERAL.SUBMIT';
  @Input() successMessage: string = '';
  @Input() successMessageArgs: {[p:string]: string} = {};
  @Input() errorMessage: string = '';
  @Input() errorMessageArgs: {[p:string]: string} = {};
  @Input() formLinks: Array<FormLink> = [];

  @Output() submitForm = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.formValidators.length > 0) {
      const existing = this.formGroup.validator ? [this.formGroup.validator] : [];
      this.formGroup.setValidators([...existing, ...this.formValidators]);
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.submitForm.emit();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
