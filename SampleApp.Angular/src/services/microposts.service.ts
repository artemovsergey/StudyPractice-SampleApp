import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Micropost } from '../models/micropost.entity';

@Injectable({
  providedIn: 'root',
})
export class MicropostsService {
  http = inject(HttpClient)
  
  public getAllbyUser(id: number){
    return this.http.get<Micropost[]>(`${environment.api}/Users/${id}/microposts`)
  }
}
