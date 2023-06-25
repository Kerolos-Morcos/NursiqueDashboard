import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NurseComponent } from './nurse/nurse.component';
import { PatientComponent } from './patient/patient.component';
import { DeviceComponent } from './device/device.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { AddDeviceComponent } from './addDevice/addDevice.component';
import { EditDeviceComponent } from './editDevice/editDevice.component';
import { authGuard } from './services/guard/auth.guard';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  // {path: '',redirectTo:'home',pathMatch:"full", data:{animation: 'routeMove'},canActivate:[authGuard]},
  { path: '', component: HomeComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'nurse', component: NurseComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'patient', component: PatientComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'device', component: DeviceComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'post', component: PostComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'order', component: OrdersComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'booking', component: BookingComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'login', component: LoginComponent, data: { animation: 'routeMove' }},
  { path: 'add', component: AddDeviceComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
  { path: 'edit/:id', component: EditDeviceComponent, data: { animation: 'routeMove' },canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
