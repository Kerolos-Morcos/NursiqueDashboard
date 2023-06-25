import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../models/APIResult';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(private http:HttpClient) { }
originalPath = "http://localhost:3500/patient/homeroute";

getAllStatistics(){
  return this.http.get<APIResult>(this.originalPath);
}
}