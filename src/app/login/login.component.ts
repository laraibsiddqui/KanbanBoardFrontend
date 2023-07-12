import { ListKeyManager } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/User.model';
import { Login } from '../Models/Login.model';
import { RegisterService } from '../Services/register.service';
import { LoginService } from '../Services/login.service';
import { ToastrService } from 'ngx-toastr';
import { SessionHandlerService } from '../Services/session-handler.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  addUser:User={
    Id:'',
    Username:'',
    Password:''
  };
  LoginVerify:Login={
   
    Username:'',
    Password:''
  };


  constructor(private router: Router, 
    private registerService:RegisterService,
    private loginService:LoginService,private toastr: ToastrService,
    private sessions: SessionHandlerService) {
      console.log("wlecome login page");
      
      sessionStorage.clear();
      this.router.navigate(['']);
     }
  
  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  repass:string='none';
  registerForm=new FormGroup({
    username:new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    password:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]),
    repassword:new FormControl("") 
  });

  get Username():FormControl{
    return this.registerForm.get("username") as FormControl;
  }
  get Password():FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  get ConfirmPass():FormControl{
    return this.registerForm.get("repassword") as FormControl;
  }
  ngOnInit():void{

    sessionStorage.clear();
  }
  registered(){

    if(this.Password.value==this.ConfirmPass.value){
          console.log("submitted");
          this.registerService.registerUser(this.addUser).subscribe(
            {
              next:(user)=>{
                console.log(user);
                this.toastr.success('Successfully Registered')
                this.ngOnInit();
                this.registerForm.reset();
                
              },
              error:(response)=>{
                console.log(response);
                this.toastr.error('Failed to Register')
                
              }
            });          
    }
    else{
      this.repass='inline';
    }
  }

  loginForm=new FormGroup({
    loginuser:new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    loginPass:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(12)])
  });
  get LoginUser():FormControl{
    return this.loginForm.get("loginuser") as FormControl;
  }
  get LoginPass():FormControl{
    return this.loginForm.get("loginPass") as FormControl;
  }

  loginSubmitted()
  {    
  
    this.loginService.LoginUser(this.LoginVerify).subscribe(
      {
        next:(user)=>{

          console.log(user);
          this.loginForm.reset();
          this.router.navigate(['/dashboard'],{ state: { fromLogin: true } });
          const keys = Object.values(user);
          let id=keys[0]
          let username=keys[1]
          let password=keys[2]
        
          let idResponse=id.toString()
          let usernameResponse=username.toString()
          let pwdResponse=password.toString()
        
          
          this.sessions.setSession(idResponse,usernameResponse,pwdResponse);
          
          // console.log(this.sessions.getSession());
          this.sessions.getSession();
          let a = this.sessions.Username()
          console.log(a)
          
          
      //  log

        },
        error:(response)=>{
          console.log(response);
          this.toastr.error('Invalid Username or Password')
          
          // Clear the session storage
          //  sessionStorage.removeItem('user');
          
        }

      });

  }
}
