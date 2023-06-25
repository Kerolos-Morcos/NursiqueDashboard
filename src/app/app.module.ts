import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule  } from "@angular/material/table";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientComponent } from './patient/patient.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NurseComponent } from './nurse/nurse.component';
import { HomeComponent } from './home/home.component';
import { DeviceComponent } from './device/device.component';
import { PostComponent } from './post/post.component';
import { RouterLink } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS ,HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from "./services/interceptor/loader.interceptor";
import { ChartsComponent } from './charts/charts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders/orders.component';
import { StringLengthPipe } from './pipes/StringLength.pipe';
import { MatIconModule } from '@angular/material/icon'; // <-- import here
import { MatSortHeader, MatSortModule } from '@angular/material/sort';
import { AddDeviceComponent } from './addDevice/addDevice.component';
import { EditDeviceComponent } from './editDevice/editDevice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [							
    AppComponent,
      NavbarComponent,
      PatientComponent,
      NurseComponent,
      HomeComponent,
      DeviceComponent,
      PostComponent,
      LoginComponent,
      LoaderComponent,
      ChartsComponent,
      OrdersComponent,
      StringLengthPipe,
      AddDeviceComponent,
      EditDeviceComponent,
      BookingComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatIconModule ,
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,


  ],
  exports:[
    MatTableModule,
    MatPaginator,
    MatSortHeader

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
