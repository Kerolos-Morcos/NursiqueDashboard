import { Injectable } from '@angular/core';
import { IPatient } from '../models/patient';
import { APIResult } from '../models/APIResult';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http:HttpClient) {}
 
 
     getAll(){
      return this.http.get<APIResult>(`http://localhost:3500/patient/allPatients`);
       
    }

    getById(id: any){
        return this.http.get<APIResult>(`http://localhost:3500/patient/${id}`);
    }
    create(patient: any){
        return this.http.post<APIResult>(`http://localhost:3500/patient/`, patient);
    }
    update(id: any, patient: any){
        return this.http.put<APIResult>(`http://localhost:3500/patient/${id}`, patient);
    }
    delete(id: any){
        return this.http.delete<APIResult>(`http://localhost:3500/patient/delPatient/${id}`);
    }
    block(id: string, data: any) {
      console.log(id);
      return this.http.put<APIResult>(`http://localhost:3500/patient/blockPatient/${id}`, data);
    }


     search(value :any){
      console.log(value);
    return this.http.post<APIResult>(`http://localhost:3500/patient/search`,{"searchTerm": value});
    
  }
    
}
