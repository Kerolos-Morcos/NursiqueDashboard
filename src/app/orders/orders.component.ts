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




  updatePatientStatus(orderId: string, patientStatus: string) {
    if (
      patientStatus === 'قيد الإنتظار' ||
      patientStatus === 'قيد التقدم' ||
      patientStatus === 'مُلغى' ||
      patientStatus === 'وصل بنجاح'
    ) {
      this.ordSrv.updatePatientStatus(orderId, patientStatus).subscribe(
        res => {
          console.log(res); // Log the entire response for debugging
          if (res.success) {
            const updatedOrderIndex = this.orders.findIndex(order => order._id === orderId);
            if (updatedOrderIndex > -1) {
              this.orders[updatedOrderIndex].patientStatus = patientStatus as 'قيد الإنتظار' | 'قيد التقدم' | 'مُلغى' | 'وصل بنجاح';
              this.dataSource.data = this.orders;
            }
          } else {
            console.error('API error:', res.message);
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
    } else {
      console.error('Invalid patient status:', patientStatus);
    }
  }
  
  getStatusButtonColor(status: string): object {
    switch (status) {
      case 'قيد الإنتظار':
        return { color: 'white', backgroundColor: '#FFBA0A', border:'none', paddingTop: '10px', borderRadius: '20px', transition: 'all 0.5s linear' };
      case 'مُلغى':
        return { color: 'white', backgroundColor: 'rgba(245, 0, 0, 0.8)', border:'none', paddingTop: '10px', borderRadius: '20px', transition: 'all 0.5s linear' };
      case 'وصل بنجاح':
        return { color: 'white', backgroundColor: 'rgba(0.36, 140, 0.36, 0.8)', border:'none', paddingTop: '10px', borderRadius: '20px', transition: 'all 0.5s linear' };
      default:
        return { color: 'white', backgroundColor: '#009EFB', border:'none', paddingTop: '10px', borderRadius: '20px', transition: 'all 0.5s linear' };
    }
  }
  

togglePatientStatus(order: IOrder) {
  let newStatus: any;

  switch (order.patientStatus) {
    case 'قيد الإنتظار':
      newStatus = 'قيد التقدم';
      break;
    case 'قيد التقدم':
      newStatus = 'وصل بنجاح';
      break;
    case 'وصل بنجاح':
      newStatus = 'مُلغى';
      break;
    case 'مُلغى':
      newStatus = 'قيد الإنتظار';
      break;
    default:
      newStatus = order.patientStatus;
  }

  this.ordSrv.updatePatientStatus(order._id, newStatus).subscribe(
    res => {
      console.log(res); // Log the entire response for debugging
      if (res.success) {
        order.patientStatus = newStatus;
        this.dataSource.data = [...this.orders];
      } else {
        console.error('API error:', res.message);
      }
    },
    error => {
      console.error('An error occurred:', error);
    }
  );
}




 





}