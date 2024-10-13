import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiDomain + "/Users";
  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }
  addUser(u:User):Observable<User>{
    return this.http.post<User>(this.baseUrl, u);
  }
}
