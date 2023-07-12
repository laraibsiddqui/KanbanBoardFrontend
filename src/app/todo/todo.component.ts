import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,Validators,FormGroup, FormControl} from '@angular/forms';
import { ITask } from '../Models/Task';
import { TicketService } from '../Services/ticket.service';
import { Ticket } from '../Models/Ticket.model';
import { SessionHandlerService } from '../Services/session-handler.service';
import { Observable, map, startWith } from 'rxjs';
import { ImplicitReceiver } from '@angular/compiler';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent  implements OnInit{

  todo:Ticket[]=[]
  inprogress:Ticket[]=[]
  rfm:Ticket []=[]
  qa:Ticket[]=[]
  qaFailed:Ticket[]=[]
  done:Ticket[]=[]

 
  tasks:Ticket []=[]
  
  addTicket:Ticket={
    userId:'',
    id:'',
    title:'',
    status:''
  }
  getTicket:Ticket={
    userId:'',
    id:'',
    title:'',
    status:''
  }
  userId:string='';
 

 
  constructor(private fb:FormBuilder,private ticketService: TicketService,private sessions: SessionHandlerService, public dialogRef:MatDialog){

  }


  ngOnInit(): void {
    this.userId=this.sessions.Id();  
    this.getTickets();
   
  }

  todoForm=new FormGroup({
    Item:new FormControl("",[Validators.required,Validators.minLength(6)]),
  
  });
  get Item():FormControl{
    return this.todoForm.get("Item") as FormControl;
  }

  getId(id:string){
    const Id=id;
    if(Id){

      this.ticketService.getTicketById(Id).
      subscribe(
         {
           next:(response)=>{
            this.getTicket=response;
           
           
             
           },
           error:(Response)=>{
            
           
          }
         }
      );
    
    }
  }

  getTickets() {
    
    setTimeout(() => {
      this.userId=this.sessions.Id(); 
    this.ticketService.getTicketByUserId(this.userId).subscribe({
       next:(ticket)=>{
              this.tasks=ticket;              
              this.todo=this.tasks.filter(x => x.status == 'ToDo');
              this.inprogress = this.tasks.filter(x => x.status == 'InProgress');              
              this.rfm = this.tasks.filter(x => x.status == 'RFM');
              this.qa = this.tasks.filter(x => x.status == 'QA');
              this.qaFailed = this.tasks.filter(x => x.status == 'QA FAILED');
              this.done = this.tasks.filter(x => x.status == 'DONE');
              console.log(this.tasks);              
       },
       error:(res)=>{
         console.log(res);         
       }
    }); 
  },100);
  }

 
  EditTicket(id:string){
    this.ticketService.updateTicket(id,this.getTicket).
    subscribe(
      {
        next:(response)=>{
           console.log(response);
           this.ngOnInit();
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
  }

  addTask(){
   
    this.addTicket.userId = this.sessions.Id();
   
    this.ticketService.addTicket(this.addTicket).subscribe(
      {
        next:(ticket)=>{ 
          console.log(ticket);
          this.ngOnInit();
          this.todoForm.reset();
              
        },
        error:(response)=>{
          console.log(response);          
        }
      });
   
      
   
  }

  updateTicketStatus(ticketId: string, newStatus: string){
    this.ticketService.updateTicketStatus(ticketId,newStatus).subscribe
    ({
      next:(res)=>{
        console.log("update",res);
        this.ngOnInit();
        
      },
      error:(err)=>{
        console.log("update",err);
        
      }
    });
}
  drop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      setTimeout(() => {
        let a = event.container.data
    
        let ticketId=a[0].id;
        const newStatus = event.container.id; 
           
        this.updateTicketStatus(ticketId, newStatus);     
      }, 100);                       
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );     
   
    }
  }

  deleteTicket(id:string){
    setTimeout(() => {
    this.ticketService.deleteTicket(id).subscribe(
      {

        next:(ticket)=>{ 
          console.log(ticket);
          this.ngOnInit();
          
              
        },
        error:(response)=>{
          console.log(response);          
        }
    });
  },100);
}

EditDialog(ele : any){
  //c
  const dialogRef = this.dialogRef.open(EditPopupComponent, {
  data: ele,
  width: '420px', // Set the desired width
  height: '420px', // Set the desired height
  panelClass: 'custom-container' 
  
 });

 dialogRef.afterClosed().subscribe((result:any) => {
  console.log(`Dialog result: ${result}`); // Pizza!
  this.ngOnInit();
});
 
}


}


