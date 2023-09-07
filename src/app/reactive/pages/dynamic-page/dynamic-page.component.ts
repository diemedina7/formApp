import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: []
})
export class DynamicPageComponent {

  /* FORMA ALTERNATIVA DE CREAR UN FORM ARRAY DE CONTROLES DE UN FORM */
  /*public myForm2 = new FormGroup({
    favoriteGames: new FormArray([])
  });*/

  public myForm: FormGroup = this.fb.nonNullable.group({
    name: [ '', [Validators.required, Validators.minLength(3)] ],
    favoriteGames: this.fb.nonNullable.array([
      [ 'GTA V',    Validators.required ],
      [ 'FIFA 23',  Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor( private fb: FormBuilder ) {}

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  public onAddToFavorite(): void {
    if (this.newFavorite.invalid)
      return;

    console.log(this.newFavorite.value);
    const newGame = this.newFavorite.value;

    // FORMA ALTERNATIVA CON FORM GROUP
    //this.favoriteGames.push( new FormControl( newGame, Validators.required ));

    this.favoriteGames.push(
      this.fb.nonNullable.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray).clear();
    this.myForm.reset();
  }

  public isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  public isValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
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
