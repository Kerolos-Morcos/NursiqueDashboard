import { Component } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { query, style, transition, trigger, animate, animateChild, group } from '@angular/animations';
import { LoginService, StoredUser } from './services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  loginService: LoginService;
  router: Router;
  name:string ='';
  title = 'nursique-Dashboard';
  isloading:BehaviorSubject<boolean>
  constructor(private loadSrv:LoaderService, loginService: LoginService, router: Router){
    this.isloading =  this.loadSrv.isLoading
    this.loginService = loginService;
        this.router = router;
  }



  
    ngOnInit() {
      this.loginService.StoredUserSub.subscribe((storedUser: StoredUser) => {
        this.name = storedUser.name;
        console.log(storedUser);
      });
    }
   


  // isloading:BehaviorSubject<boolean>
  // constructor(private loadSrv:LoaderService){
  //   this.isloading =  this.loadSrv.isLoading
  // }


  }

