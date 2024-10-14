import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl: string = environment.apiDomain + "/Categories";
  constructor(private http:HttpClient) { }
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl);
  }
  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(this.baseUrl + `/${id}`);
  }
  addCategory(c:Category):Observable<Category>{
    return this.http.post<Category>(this.baseUrl, c);
  }
  updateCategory(c:Category):Observable<Category>{
    return this.http.put<Category>(this.baseUrl+ `/${c.id}`, c);
  }
  deleteCategory(c:Category):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ `/${c.id}`);
  }
}
