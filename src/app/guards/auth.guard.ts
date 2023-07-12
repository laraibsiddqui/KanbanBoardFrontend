import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
    const loginservice:LoginService=inject(LoginService)
    const router:Router=inject(Router)
    if (loginservice.IsLoggedIn()) {
     
        
        return true;
    }
    router.navigate(['']);
    return false;
};


