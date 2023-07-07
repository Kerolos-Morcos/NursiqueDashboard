import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http:HttpClient) { }

  Getchartinfo(): Observable<any> {
    return this.http.get("http://localhost:3000/sales");
  }

  patients(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>("http://localhost:3000/patients");
  }

  nurses(): Observable<NurseData[]> {
    return this.http.get<NurseData[]>("http://localhost:3000/nurses");
  }

  orders(): Observable<OrderData[]> {
    return this.http.get<OrderData[]>("http://localhost:3000/orders");
  }

  bookings(): Observable<BookingData[]> {
    return this.http.get<BookingData[]>("http://localhost:3000/bookings");
  }

}

interface PatientData {
  month: string;
  visits: number;
  numDevices: number;
  numNurses: number;
  numOrders: number;
  numBookings: number;
  colorcode: string;
}

interface NurseData {
  month: string;
  numNurses: number;
  colorcode: string;
}

interface OrderData {
  month: string;
  numOrders: number;
  colorcode: string;
}

interface BookingData {
  month: string;
  numBookings: number;
  colorcode: string;
}