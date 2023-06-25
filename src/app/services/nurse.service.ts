import { Injectable } from '@angular/core';
import { INurse } from '../models/INurse';
import { APIResult } from '../models/APIResult';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  constructor(private http:HttpClient) {}
  originalPath ="http://localhost:3500/nurse/" 
  getAll(){
    return this.http.get<APIResult>(this.originalPath + "getNurses");
  }
  delete(_id:string){
    console.log(_id);
    return this.http.delete<any>(this.originalPath + `delete/${_id}`);  
  }
  search(value :any){
    return this.http.post<APIResult>(`http://localhost:3500/nurse/search`,{"searchTerm": value});
    
  }
  
}
