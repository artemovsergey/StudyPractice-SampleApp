import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
import { Auth } from './auth/auth';
import { Sign } from './sign/sign';

export const routes: Routes = [
    { path: 'sign', component: Sign },
    { path: 'auth', component: Auth },
    { path: 'users', component: Users },
    { path: 'home', component: Home },
    { path: '', component: Home },
];
