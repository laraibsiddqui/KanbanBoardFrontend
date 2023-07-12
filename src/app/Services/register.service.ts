import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseApiUrl:string="https://localhost:7060";
  constructor(private http:HttpClient) { }

  registerUser(addUser:User): Observable<User[]>{
     addUser.Id="00000000-0000-0000-0000-000000000000"
     return  this.http.post<User[]>(this.baseApiUrl + '/api/User',addUser);

  }
}
