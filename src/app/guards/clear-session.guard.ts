import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const clearSessionGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router);
  const previousUrl = router.url;
  const isComingFromDashboard = previousUrl.includes('/dashboard');

  // if (isComingFromDashboard) {
   
  //   // sessionStorage.clear();
  //   // router.navigate(['']);
  //   // return true;
  // }

 
  return false;
 
};
