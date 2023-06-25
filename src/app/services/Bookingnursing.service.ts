import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResult } from '../models/APIResult';

@Injectable({
  providedIn: 'root'
})
export class BookingnursingService {
  
  constructor(private http:HttpClient) {}
 

  getAll(){
   return this.http.get<APIResult>(`http://localhost:3500/book/bookings`); 
 }


 Accept(x: any) {
  console.log(x)
  const bookingId = x;
  const newStatus = 'accepted';
 return this.http.put <APIResult>(`http://localhost:3500/book/bookings/${x}` , { status: newStatus })
    
 }

 Reject(y: any) {
  console.log(y)
  const bookingId = y;
  const newStatus = 'Rejected';
 return this.http.put <APIResult>(`http://localhost:3000/book/bookings/${y}` , { status: newStatus })
 }
      // success
    //   data => {
    //     console.log('Booking status updated successfully!', data);
    //     // do something with the updated booking data
    //   },
    //   // error
    //   error => {
    //     console.error('Error updating booking status:', error);
    //   }
    // );
}

 
