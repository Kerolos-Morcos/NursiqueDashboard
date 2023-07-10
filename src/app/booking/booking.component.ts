import { Component , OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BookingnursingService } from '../services/Bookingnursing.service';
import { booking } from '../models/Ibooking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  hideParagraph = true;
  dataSource = new MatTableDataSource<booking>([]);
  bookings: booking[] = [];

  displayedColumns: string[] = [
    'joinedDate',
    'userName', 
    'userCity',
    'userAddress',
    // 'service',
    'price',
    'status',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private bookingNursingService:BookingnursingService) { }

  ngOnInit() {
    this.bookingNursingService.getAll().subscribe({
      next: (res: { data: booking[]; }) => {
        const bookings = res.data as booking[];
        console.log(res.data);
        this.dataSource.data = bookings;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
 
  getStatusCellStyle(status: string): any {
    if (status === 'accepted') {
      return {'status-text-success': true };
    } else {
      return { 'status-text-fail': true };
    }
  }
 
}