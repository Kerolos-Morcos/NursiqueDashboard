import { Injectable } from '@angular/core';
import { APIResult } from '../models/APIResult';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }
  getByID(id:string) {
    return this.http.get<APIResult>(`http://localhost:3500/device/getDevice/${id}`);  
  }
  getAll(){
    return this.http.get<APIResult>(`http://localhost:3500/device/getDevices`);
    
  }  
  search(value :any){
    return this.http.post<APIResult>(`http://localhost:3500/device/search`,{"searchTerm": value});
    
  }
  
  add(data: FormData) {
     
    return this.http.post<APIResult>(`http://localhost:3500/device/addDevice`, data);

   }
  delete(id:string){
    return this.http.delete<APIResult>(`http://localhost:3500/device/delete/${id}`);  

  }

  update(data: FormData, id:string) {
    return this.http.put<APIResult>(`http://localhost:3500/device/update/${id}`, data);
  }
}
