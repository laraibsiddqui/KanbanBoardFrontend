import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/Login.model';
import { Observable } from 'rxjs';
import { SessionHandlerService } from './session-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseApiUrl:string="https://localhost:7060";
  constructor(private http:HttpClient, private sessions: SessionHandlerService) { }

  LoginUser(loginUser:Login): Observable<Login[]>{
   
    return  this.http.post<Login[]>(this.baseApiUrl + '/api/User/loginUser',loginUser);

 }

 IsLoggedIn(){
  this.sessions.getSession();
  let a = this.sessions.Username();
  console.log(a);
  
  if (a) {
    return true
  } else {
    return false
  }
 }
}
