import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comment } from '../../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl: string = environment.apiDomain + "/Comments";
  constructor(private http:HttpClient) { }
  getAllComments(ticketId:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.baseUrl + `?ticketId=${ticketId}`);
  }
  getCommentById(id:string):Observable<Comment>{
    return this.http.get<Comment>(this.baseUrl + `/${id}`);
  }
  addComment(c:Comment):Observable<Comment>{
    return this.http.post<Comment>(this.baseUrl, c);
  }
  updateComment(c:Comment):Observable<Comment>{
    return this.http.put<Comment>(this.baseUrl+ `/${c.id}`, c);
  }
  deleteComment(c:Comment):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ `/${c.id}`);
  }
}
