import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIResult } from '../models/APIResult';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  StoredUserSub:BehaviorSubject<StoredUser>

  constructor(private http:HttpClient) {
    this.StoredUserSub = new BehaviorSubject<StoredUser>(this.getUser())

   }
  login(email: string, password: string) {
    return this.http.post<APIResult>('http://localhost:3500/admin/adminLogin', { 'email':email, 'password':password });
  }


  setUser(image: string, name: string) {
    const storedUser = { name,image } as StoredUser;
    localStorage.setItem('storedUser', JSON.stringify(storedUser));
    this.StoredUserSub.next(storedUser);
  }
  getUser():StoredUser{
    let check = localStorage.getItem("storedUser")
    if(check == null)
      return {image:"", name:""}
    else
      return JSON.parse(check)  as StoredUser
  }
  logout(){
    localStorage.removeItem("storedUser")
    // this.setUser("", "")

  }
}


export interface StoredUser{
  name:string;
  image:string
  // token:string;
}
