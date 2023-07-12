import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionHandlerService {
  private id    = "";
  private username    = "";
  private password    = "";


  constructor() { }

  public setSession(id: string, username : string, password: string)
  {
    var user = {
      'id'  : id , 
      'username'   : username, 
      'password '  : password 
    };
  
    sessionStorage.setItem("User", JSON.stringify(user));
  }

  public getSession()
  {
    let user =  sessionStorage.getItem("User");

    if(user) {
      var jsonResult   = JSON.parse(user); 
      this.id      = jsonResult.id;
      this.username         = jsonResult.username ;
      this.password       = jsonResult.passsword ;
     
    }
  }

  public Id()    : string  { return this.id; }
  public Username()     : string  { return this.username; }
  public Password()    : string  { return this.password; }
  

  public clearSession()
  {
    sessionStorage.clear();    
    this.id  = "";
    this.username   = "";
    this.password   = "";
   
  }


}
