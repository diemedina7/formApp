import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.nonNullable.group({
    name:             [ '', [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )] ],
    email:            [ '', [Validators.required, Validators.pattern( this.validatorsService.emailPattern )] ],
    username:         [ '', [Validators.required, this.validatorsService.cantBeStrider] ],
    password:         [ '', [Validators.required, Validators.minLength(6)] ],
    confirmPassword:  [ '', [Validators.required, Validators.minLength(6)] ],
  });

  constructor( private fb: FormBuilder, private validatorsService: ValidatorsService ) {}

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  public onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
