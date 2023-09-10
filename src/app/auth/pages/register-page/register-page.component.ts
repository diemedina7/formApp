import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.nonNullable.group({
    name:             [ '', Validators.required ],
    email:            [ '', Validators.required ],
    username:         [ '', Validators.required ],
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
