import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.nonNullable.group({
    name:             [ '', [Validators.required, Validators.pattern( customValidators.firstNameAndLastnamePattern )] ],
    email:            [ '', [Validators.required, Validators.pattern( customValidators.emailPattern )] ],
    username:         [ '', [Validators.required, customValidators.cantBeStrider] ],
    password:         [ '', [Validators.required, Validators.minLength(6)] ],
    confirmPassword:  [ '', [Validators.required, Validators.minLength(6)] ],
  });

  constructor( private fb: FormBuilder ) {}

  public isValidField( field: string ) {
    //TODO: obtener validacion desde un service
  }

  public onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
