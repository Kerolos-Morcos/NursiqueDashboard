import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../models/APIResult';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http:HttpClient) { }
  originalPath = "http://localhost:3500/order/allOrders";
    
    getAllOrders(){
      return this.http.get<APIResult>(this.originalPath);
    } 


    // New By Kero
    originalPathStatus = "http://localhost:3500/order";
    updatePatientStatus(orderId: string, patientStatus: string) {
      return this.http.put<APIResult>(`${this.originalPathStatus}/updatePatientStatus/${orderId}`, { patientStatus: patientStatus });
    }
    
  }
