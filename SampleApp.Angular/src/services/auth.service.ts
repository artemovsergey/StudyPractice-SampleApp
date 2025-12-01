import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment.development';
import User from '../models/user.entity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  public router = inject(Router);

  constructor() {
    this.initializeUser();
  }

    private initializeUser() {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user: User = JSON.parse(userJson);
        this.currentUser.set(user);
        console.log('Отправили данные пользователя из localStorage');
      } else {
        this.currentUser.set(null);
        console.log('localStorage не содержит данных о пользователе');
      }
    }

  login(model: any): Observable<User | null> {
    return this.http
      .post<User>(`${environment.api}/Users/Login`, model, this.generateHeaders())
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
            return user;
          } else {
            console.log(response);
            return null;
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(environment.api + '/Users', model);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/auth']);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `` }),
    };
  };
}
