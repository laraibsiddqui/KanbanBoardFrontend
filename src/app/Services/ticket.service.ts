import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../Models/Ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ListTask:Ticket []=[]
  baseApiUrl:string="https://localhost:7060";
  constructor(private http:HttpClient) { }

  addTicket(addTicket:Ticket): Observable<Ticket[]>{
    addTicket.id="00000000-0000-0000-0000-000000000000"
    return  this.http.post<Ticket[]>(this.baseApiUrl + '/api/Ticket',addTicket);
  }

  getTicket(): Observable<Ticket[]>{
    return  this.http.get<Ticket[]>(this.baseApiUrl + '/api/Ticket');
  }
  getTicketByUserId(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseApiUrl}/api/Ticket/UserId?userId=${userId}`);
  }

  updateTicketStatus(ticketId: string, ticketStatus: string): Observable<Ticket[]> {
    return this.http.put<Ticket[]>(`${this.baseApiUrl}/api/Ticket/TicketStatus?ticketId=${ticketId}&ticketStatus=${ticketStatus}`,{});
  }

  deleteTicket(ticketId:string):Observable<Ticket[]> {
    return this.http.delete<Ticket[]>(this.baseApiUrl + '/api/Ticket/'+ticketId);
  }

  getTicketById(id:string): Observable<Ticket>{
    return  this.http.get<Ticket>(this.baseApiUrl + '/api/Ticket/'+id);
  }

  updateTicket(id:string,updateTask: Ticket):Observable<Ticket>{
    return this.http.put<Ticket>(this.baseApiUrl + '/api/Ticket/' + id,updateTask);
  }

  
}
