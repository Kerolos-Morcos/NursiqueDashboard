 import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard  {
  constructor(private login:LoginService,private router:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      let admin = this.login.getUser()
      if(admin.name ==""||admin.name==undefined){
        console.log(route,state)
        // alert("you need login")
        this.router.navigateByUrl('/login')
       
          
    
        return false;
      }

      else
        return true;
  }
  

};
