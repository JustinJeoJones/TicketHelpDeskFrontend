import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //header component sets this. This is user from DB
  currentUser: User | null = null;
  baseUrl: string = environment.apiDomain + "/Users";
  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }
  getUserById(id:string):Observable<User>{
    return this.http.get<User>(this.baseUrl + `/${id}`);
  }
  addUser(u:User):Observable<User>{
    return this.http.post<User>(this.baseUrl, u);
  }
  updateUser(u:User):Observable<User>{
    return this.http.put<User>(this.baseUrl+ `/${u.googleId}`, u);
  }
  deleteUser(u:User):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ `/${u.googleId}`);
  }

  getCurrentUserRole():Role|undefined{
    return this.currentUser?.role;
  }
}
