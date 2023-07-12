import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionHandlerService } from '../Services/session-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName:string=this.sessions.Username();
  firstLetter:string = this.userName.charAt(0).toUpperCase();
  remainingLetters = this.userName.slice(1).toLowerCase();
  
  constructor( private router: Router,private sessions: SessionHandlerService){
    
  }
 
  
logout(){
 
  sessionStorage.clear();
  console.log("hello");
  
  
  this.router.navigate(['']);

 }

}
