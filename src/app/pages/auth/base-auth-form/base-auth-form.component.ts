import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {FormLink} from '../../../shared/interfaces/form-link.interface';
import {FormField} from '../../../shared/interfaces/form-field.interface';
import {AlertComponent} from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-base-auth-form',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    NgIf,
    RouterLink,
    NgStyle,
    AlertComponent
  ],
  templateUrl: './base-auth-form.component.html',
  styleUrl: './base-auth-form.component.scss'
})
export class BaseAuthFormComponent implements OnInit {
  @Input() maxWidthRem: number = 25;
  @Input() heading: string = '';
  @Input() formGroup!: FormGroup; // trust me bro
  @Input() formFields: Array<FormField> = [];
  @Input() formValidators: ValidatorFn[] = [];
  @Input() submitText: string = 'GENERAL.SUBMIT';
  @Input() successMessage: string = '';
  @Input() successMessageArgs: { [p: string]: string } = {};
  @Input() errorMessage: string = '';
  @Input() errorMessageArgs: { [p: string]: string } = {};
  @Input() formLinks: Array<FormLink> = [];

  @Output() submitForm = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.formValidators.length > 0) {
      const existing = this.formGroup.validator ? [this.formGroup.validator] : [];
      this.formGroup.setValidators([...existing, ...this.formValidators]);
      this.formGroup.updateValueAndValidity();
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
