import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
import { Auth } from './auth/auth';
import { Sign } from './sign/sign';
import { authGuard } from '../guards/auth-guard';
import { Profile } from './profile/profile';
import { EditUser } from './edit-user/edit-user';
import { preventUnsavedChangesSignFormGuard } from '../guards/prevent-unsaved-changed-sign.guard';
import { preventUnsavedChangesEditFormGuard } from '../guards/prevent-unsaved-changed-edit.guard';

export const routes: Routes = [
    
    { path: 'users/:id', component: Profile, canActivate: [authGuard] },
    { path: 'edit/:id', component: EditUser, canActivate: [authGuard], canDeactivate: [preventUnsavedChangesEditFormGuard] },
    { path: 'sign', component: Sign, canDeactivate: [preventUnsavedChangesSignFormGuard]},
    { path: 'auth', component: Auth },
    { path: 'users', component: Users, canActivate: [authGuard] },
    { path: 'home', component: Home },
    { path: '', component: Home },
];
