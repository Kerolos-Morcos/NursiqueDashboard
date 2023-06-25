import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../models/APIResult';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http:HttpClient) {}
  originalPath ="http://localhost:3500/post/"
  getAllPosts(){
    return this.http.get<APIResult>(this.originalPath + "patientPosts");
  } 

  delete(_id:string){
    return this.http.delete<any>(this.originalPath + `delete/${_id}`);  
  }
}
