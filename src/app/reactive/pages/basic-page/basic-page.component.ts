import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {

  /* params formcontrol(default_value, sync_validator, async_validator) -> FORMGROUP */
  /*public myForm: FormGroup = new FormGroup({
    name:         new FormControl(''),
    price:        new FormControl(0),
    inStorage:    new FormControl(0)
  });*/

  /* formcontrol(default_value, sync_validator, async_validator) -> FORMBUILDER */
  public myForm: FormGroup = this.fb.group({
    name:       [''],
    price:      [0],
    inStorage:  [0]
  })

  constructor( private fb: FormBuilder ) {}

  public onSave(): void {
    console.log(this.myForm.value);
  }
}
