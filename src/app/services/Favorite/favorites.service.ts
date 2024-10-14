import { Injectable } from '@angular/core';
import { Favorite } from '../../models/favorite';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  baseUrl: string = environment.apiDomain + "/Favorites";
  constructor(private http:HttpClient) { }
  getAllFavorites():Observable<Favorite[]>{
    return this.http.get<Favorite[]>(this.baseUrl);
  }
  getFavoriteById(id:string):Observable<Favorite>{
    return this.http.get<Favorite>(this.baseUrl + `/${id}`);
  }
  addFavorite(f:Favorite):Observable<Favorite>{
    return this.http.post<Favorite>(this.baseUrl, f);
  }
  updateFavorite(f:Favorite):Observable<Favorite>{
    return this.http.put<Favorite>(this.baseUrl+ `/${f.id}`, f);
  }
  deleteFavorite(f:Favorite):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ `/${f.id}`);
  }
}
