import { Component, ViewChild } from '@angular/core';
import { IOrder, IProduct } from '../models/IOrder';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: IOrder[] = [];
  // displayedColumns: string[] = ['userName', 'products', 'startDate', 'endDate', 'patientStatus', 'totalPrice'];
  displayedColumns: string[] = ['userName', 'products', 'startDate', 'endDate', 'patientStatus'];
  dataSource = new MatTableDataSource<IOrder>(this.orders);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordSrv: OrderService) { }

  ngOnInit() {
    this.ordSrv.getAllOrders().subscribe(
      res => {
        console.log(res); // Log the entire response for debugging
        if (res.success) {
           this.orders = res.data;
          this.dataSource = new MatTableDataSource<IOrder>(this.orders);
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('API error:', res.message);
        }
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }

  getProductNames(products: IProduct[]): string {
    return products.map(p => p.name).join(', ');
  }
}