import { CanDeactivateFn } from '@angular/router';
import { Sign } from '../app/sign/sign';

export const preventUnsavedChangesSignFormGuard: CanDeactivateFn<Sign> = (component: Sign) => {
  if (component.signForm.dirty) {
    return confirm('Вы хотите продолжить?');
  }
  return true;
};
