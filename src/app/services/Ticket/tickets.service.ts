import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  baseUrl: string = environment.apiDomain + "/Tickets";
  constructor(private http:HttpClient) { }
  getAllTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.baseUrl);
  }
  getAllTicketsByFavs(googleId:string):Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.baseUrl + `/FavsByUser/${googleId}`);
  }
  getTicketById(id:number):Observable<Ticket>{
    return this.http.get<Ticket>(this.baseUrl + `/${id}`);
  }
  addTicket(t:Ticket):Observable<Ticket>{
    return this.http.post<Ticket>(this.baseUrl, t);
  }
  updateTicket(t:Ticket):Observable<Ticket>{
    return this.http.put<Ticket>(this.baseUrl+ `/${t.id}`, t);
  }
  deleteTicket(t:Ticket):Observable<void>{
    return this.http.delete<void>(this.baseUrl+ `/${t.id}`);
  }
}
