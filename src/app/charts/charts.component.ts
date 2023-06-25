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
  constructor(private chartsService: ChartsService) {}

  ngOnInit(): void {
    this.chartsService.patients().subscribe((data: PatientData[]) => {
      const labels = data.map((item) => item.month);
      const visits = data.map((item) => item.visits);
      const devices = data.map((item) => item.numDevices);
      const colors = data.map((item) => item.colorcode);

      this.renderChart(labels, visits, colors, 'line', 'linechart', 'Patient Visits');
     });

    this.chartsService.nurses().subscribe((data: NurseData[]) => {
      const labels = data.map((item) => item.month);
      const numNurses = data.map((item) => item.numNurses || 0); // Use 0 as default value if numNurses is undefined
      const colors = data.map((item) => item.colorcode);

      this.renderChart(labels, numNurses, colors, 'pie', 'piechart', 'Nurse');
    });

    this.chartsService.orders().subscribe((data: OrderData[]) => {
      const labels = data.map((item) => item.month);
      const numOrders = data.map((item) => item.numOrders);
      const colors = data.map((item) => item.colorcode);

      this.renderChart(labels, numOrders, colors, 'bar', 'barchart', 'Order');
    });

    this.chartsService.bookings().subscribe((data: BookingData[]) => {
      const labels = data.map((item) => item.month);
      const numBookings = data.map((item) => item.numBookings);
      const colors = data.map((item) => item.colorcode);

      this.renderChart(labels, numBookings, colors, 'radar', 'radarchart', 'Booking');
    });
  }

  renderChart(labels: any, data: any, colors: any, type: any, id: any, labelName: string) {
    const chart = new Chart(id, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${labelName} Data`,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
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
  numNurses?: number;  
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