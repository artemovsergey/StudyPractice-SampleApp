import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
import { Auth } from './auth/auth';
import { Sign } from './sign/sign';
import { authGuard } from '../guards/auth-guard';
import { preventUnsavedChangesGuard } from '../guards/prevent-unsaved-changed.guard';
import { Profile } from './profile/profile';

export const routes: Routes = [
    { path: 'users/:id', component: Profile, canActivate: [authGuard] },
    { path: 'sign', component: Sign, canDeactivate: [preventUnsavedChangesGuard]},
    { path: 'auth', component: Auth },
    { path: 'users', component: Users, canActivate: [authGuard] },
    { path: 'home', component: Home },
    { path: '', component: Home },
];
