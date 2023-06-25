import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartsService } from '../services/charts.service';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  constructor(private charSrv: ChartsService) {}

  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  ngOnInit(): void {
    this.charSrv.Getchartinfo().subscribe((res) => {
      this.chartdata = res;
      if(this.chartdata!=null){
        for(let i=0 ; i<this.chartdata.length; i++){
          this.labeldata.push(this.chartdata[i].year);
          this.realdata.push(this.chartdata[i].amount);
          this.colordata.push(this.chartdata[i].colorcode);
        }
        this.RenderChart(this.labeldata,this.realdata,this.colordata, 'bar', 'barchart');
        this.RenderChart(this.labeldata,this.realdata,this.colordata, 'pie', 'piechart');
        this.RenderChart(this.labeldata,this.realdata,this.colordata, 'radar', 'radarchart');
        this.RenderChart(this.labeldata,this.realdata,this.colordata, 'line', 'linechart');
      }
    });
  }

  RenderChart(labeldata:any, maindata:any, colordata:any, type:any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: maindata,
            backgroundColor: colordata,
            borderColor: [
              'rgb(92, 178, 92,1)',
            ],
            borderWidth: 0.8,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
