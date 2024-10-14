import { Injectable } from '@angular/core';
import { Role } from '../../models/role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  baseUrl: string = environment.apiDomain + "/Roles";
  constructor(private http:HttpClient) { }
  getAllRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.baseUrl);
  }
  getRoleById(id:string):Observable<Role>{
    return this.http.get<Role>(this.baseUrl + `/${id}`);
  }
  addRole(r:Role):Observable<Role>{
    return this.http.post<Role>(this.baseUrl, r);
  }
  updateRole(r:Role):Observable<Role>{
    return this.http.put<Role>(this.baseUrl+ `/${r.id}`, r);
  }
  deleteRole(r:Role):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ `/${r.id}`);
  }
}
