import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Statistics } from '../models/IStatistics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  statics: Statistics = {} as Statistics;
  
  constructor(private statisticsSrv: HomeService) {
    this.fetchStatistics();
  }
  
  fetchStatistics() {
    this.statisticsSrv.getAllStatistics().subscribe(
      (res: any) => {
        this.statics = res.data;
        console.log(this.statics);
      },
      (error) => {
        console.error('Error occurred:', error);
      },
      () => {
        console.log('API request completed.');
      }
    );
  }
}
