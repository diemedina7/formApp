import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: []
})
export class BasicPageComponent {

  /* params formcontrol(default_value, sync_validator, async_validator) -> FORMGROUP */
  /*public myForm: FormGroup = new FormGroup({
    name:         new FormControl(''),
    price:        new FormControl(0),
    inStorage:    new FormControl(0)
  });*/

  /* formcontrol(default_value, sync_validator, async_validator) -> FORMBUILDER */
  public myForm: FormGroup = this.fb.nonNullable.group({
    name:       [ '', [Validators.required, Validators.minLength(3)] ],
    price:      [ 0,  [Validators.required, Validators.min(0)] ],
    inStorage:  [ 0,  [Validators.required, Validators.min(0)] ]
  })

  constructor( private fb: FormBuilder ) {}

  public onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }

  public isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  public getFieldError( field: string ): string | null {
    if ( !this.myForm.contains(field) )
      return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const error of Object.keys(errors)) {
      switch(error) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors["minlength"].requiredLength } caracteres`;
      }
    }

    return null;
  }

}
