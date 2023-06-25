import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { INurse } from '../models/INurse';
import { NurseService } from '../services/nurse.service';
import { Router } from '@angular/router';
import { DeviceComponent } from '../device/device.component';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit, AfterViewInit {
  nurses: INurse[] =[];
  displayedColumns: string[] = ['profile', 'name', 'age', 'region','address','email','gender','phone' ];
  dataSource = new MatTableDataSource<INurse>(this.nurses);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private nurSrv: NurseService, private route: Router,private devSrv :DeviceService) {
    
  }
  
  ngOnInit() {
    this.refreshData()
  }
  
  deleteRow(_id: string) {
    console.log(_id);
    this.nurSrv.delete(_id).subscribe(
      () => {
        console.log("Successfully deleted");
        this.route.navigateByUrl('nurse');
        this.refreshData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  refreshData() {
    this.nurSrv.getAll().subscribe(res=>{
      this.nurses = res.data;
      this.dataSource = new MatTableDataSource<INurse>(this.nurses);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(value: string): void {
    this.nurSrv.search(value).subscribe({
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
