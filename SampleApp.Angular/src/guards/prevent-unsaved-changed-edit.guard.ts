import { CanDeactivateFn } from '@angular/router';
import { EditUser } from '../app/edit-user/edit-user';

export const preventUnsavedChangesEditFormGuard: CanDeactivateFn<EditUser> = (
  component: EditUser
) => {
  if (component.editForm.dirty) {
    return confirm('Вы хотите продолжить?');
  }
  return true;
};
