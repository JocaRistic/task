import { FormControl } from '@angular/forms';

//provera email
export function emailValidator(
  control: FormControl
): { [key: string]: any } | null {
  var pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  return pattern.test(control.value) ? null : { invalidEmail: true };
}

//samo string
export function stringValidator(
  control: FormControl
): { [key: string]: any } | null {
  var pattern = new RegExp('^[a-zA-Z]+$');
  if (!pattern.test(control.value)) {
    return { invalidString: true };
  } else {
    return null;
  }
}

//broj telefona validator, sadrzi samo brojeve
export function numberValidator(
  control: FormControl
): { [key: string]: any } | null {
  var pattern = new RegExp('^[0-9]+$');
  if (!pattern.test(control.value)) {
    return { invalidPhone: true };
  } else {
    return null;
  }
}

//password validator, treba sadrzati min. 5 karaktera i mora sadrzati veliko slovo, specijalni znak i broj
export function passwordValidator(
  control: FormControl
): { [key: string]: any } | null {
  var pattern = new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{5,}$'
  );
  if (!pattern.test(control.value)) {
    return { invalidPassword: true };
  } else {
    return null;
  }
}
