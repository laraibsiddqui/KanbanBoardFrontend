import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { TicketService } from '../Services/ticket.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit{
  selected = this.data.status;
  userId:string='';
  constructor(public dialogRef: MatDialogRef<EditPopupComponent>,private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: any){

      console.log(data);
      

  }

  ngOnInit():void{

    
  }
  onNoClick(): void {
    this.dialogRef.close();

  }

  // getTickets() {
    
  //   setTimeout(() => {
  //     this.userId=this.sessions.Id(); 
  //   this.ticketService.getTicketByUserId(this.userId).subscribe({
  //      next:(ticket)=>{
  //             this.tasks=ticket;              
  //             this.todo=this.tasks.filter(x => x.status == 'ToDo');
  //             this.inprogress = this.tasks.filter(x => x.status == 'InProgress');              
  //             this.rfm = this.tasks.filter(x => x.status == 'RFM');
  //             this.qa = this.tasks.filter(x => x.status == 'QA');
  //             this.qaFailed = this.tasks.filter(x => x.status == 'QA FAILED');
  //             this.done = this.tasks.filter(x => x.status == 'DONE');
  //             console.log(this.tasks);              
  //      },
  //      error:(res)=>{
  //        console.log(res);         
  //      }
  //   }); 
  // },100);
  // }

  updateTicket(){
  this.ticketService.updateTicket(this.data.id,this.data).subscribe
  ({
    next:(response)=>{
     console.log(response
      );
      this.ngOnInit()
      this.dialogRef.close();
      
     
    },
    error:(err)=>{
      console.log(err);
      
    }
  });
  }

  deleteTicket(id:string){
    setTimeout(() => {
    this.ticketService.deleteTicket(id).subscribe(
      {

        next:(ticket)=>{ 
          console.log(ticket);
          this.dialogRef.close();
          
              
        },
        error:(response)=>{
          console.log(response);          
        }
    });
  },100);
}
}
