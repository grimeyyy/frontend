import {Directive} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormField} from '../../../shared/interfaces/form-field.interface';
import {FormLink} from '../../../shared/interfaces/form-link.interface';


@Directive()
export abstract class BaseAuthComponent {
  public successMessage: string = '';
  public errorMessage: string = '';

  abstract formGroup: FormGroup;
  abstract formFields: Array<FormField>;
  abstract formLinks: Array<FormLink>;

  abstract onSubmit(): void;
}

