import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
 import { PatientService } from '../services/patient.service';
import { IPatient } from '../models/patient';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<IPatient>([]);
  patients: IPatient[] = [];
  displayedColumns: string[] = [
    'profile',
    'name',
    'email',
    'phoneNumber',
    'age',
    'gender',
    'isBlocked',
    'block',
  ];

   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private  patSrv: PatientService) {}
  ngOnInit() {
    this.patSrv.getAll().subscribe({
      next: (res) => {  
        const patients = res.data as IPatient[];
        this.dataSource.data = patients;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  data: any;
  // block(id: string) {
  //   this.patSrv.block(id, this.data).subscribe({
  //     next: (res) => {
  //       this.patSrv.getAll().subscribe({
  //         next: (res) => {
  //           const patients = res.data as IPatient[];
  //           this.dataSource.data = patients;
  //           this.dataSource.paginator = this.paginator;
  //           console.log(res.data[0].isBlocked);
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.log(err); // handle the error as needed
  //     }
  //   });
  // }
  block(id: string) {
    this.patSrv.block(id, this.data).subscribe({
      next: (res) => {
        const patient = this.dataSource.data.find((p) => p._id === id);
        if (patient) {
          patient.isBlocked = !patient.isBlocked;
        }
        this.dataSource.data = [...this.dataSource.data];
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  search(value: string): void {
    this.patSrv.search(value).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
            }
    });
  }

  test(event:any,value: string){
    event.preventDefault()
    console.log(event)
    this.search(value)
  }
 
}