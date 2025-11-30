import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

  export const loginForbiddenValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const login = control.get('login');
    return login?.value === 'admin' ? { checkConfirmLogin: true } : null;
  };