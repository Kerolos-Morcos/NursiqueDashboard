import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: 'booking.component.html',
  styleUrls: ['booking.component.css']
})
export class BookingComponent {
  dataSource = [
    {
      period: { times: '2 am - 3 am', day: 'الاثنين' },
      userAddress: 'اسوان الجديدة',
      userCity: 'اسوان',
      userName: 'احمد عبد العليم',
      price: 250,
      status: 'accepted'
    },
    {
      period: { times: '4 pm - 5 pm', day: 'الأحد' },
      userAddress: 'السيل',
      userCity: 'اسوان',
      userName: 'عمر الأمير',
      price: 400,
      status: 'rejected'
    },
    {
      period: { times: '10 am - 11 am', day: 'الثلاثاء' },
      userAddress: 'كيما',
      userCity: 'اسوان',
      userName: 'محمد خالد',
      price: 100,
      status: 'rejected'
    },
    {
      period: { times: '7 pm - 8 pm', day: 'الجمعة' },
      userAddress: 'التأمين',
      userCity: 'اسوان',
      userName: 'ابراهيم حسني',
      price: 250,
      status: 'accepted'
    },
    {
      period: { times: '9 am - 10 am', day: 'الأربعاء' },
      userAddress: 'كيما',
      userCity: 'اسوان',
      userName: 'مدثر يوسف',
      price: 600,
      status: 'rejected'
    },
    {
      period: { times: '1 am - 2 am', day: 'الأحد' },
      userAddress: 'المحطة',
      userCity: 'اسوان',
      userName: 'حمادة محمد',
      price: 150,
      status: 'accepted'
    },
    // Add more static data objects here if needed
  ];

  displayedColumns: string[] = ['joinedDate', 'userName' ,'userAddress', 'userCity', 'price', 'status'];

  getStatusCellStyle(status: string): string {
    switch (status) {
      case 'accepted':
        return 'status-text-success';
      case 'rejected':
        return 'status-text-fail'; 
    }
    return '';
  }
}
