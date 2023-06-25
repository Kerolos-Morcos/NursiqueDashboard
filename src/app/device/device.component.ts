import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDevice } from '../models/device';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent {
  dataSource = new MatTableDataSource<IDevice>([]);

  @Input('cols') columList: string[]=[]

  @Input('rows') rowList : any[]=[]
  matDataSource:MatTableDataSource<any>
  devices: IDevice[] = [];

  displayedColumns: string[] = [
    'image',
    // '_id',
    'name',
    'price',
    'details',
    'quantity',
    'category',
    // 'status',
    'edit',
    'delete'
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 




  constructor(private devSrv: DeviceService) {
    this.columList=[];
    this.rowList=[];
    this.matDataSource=new MatTableDataSource

  }





  ngOnInit() {
    this.refreshData()
  }
  
 

  refreshData() {
    this.devSrv.getAll().subscribe({
      next: (res) => {
        const devices = res.data as IDevice[];
        console.log(res);  
        this.dataSource.data = devices;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    });
  }










 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  editRow(device: IDevice) {
    this.openEditDialog(device);
  }
  openEditDialog(device: IDevice) {
    throw new Error('Method not implemented.');
  }

   
  // deleteRow(id: string) {
  //   this.devSrv.delete(id).subscribe(
  //     (res) => {
  //       console.log(res) 
  //     },
  //      (err) => {
  //         console.log(err);
  //      }
  //   );  
  // }

  deleteRow(id: string) {
    this.devSrv.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshData();
        // Handle the successful response here
      },
      error: (err) => {
        console.log(err);
        // Handle the error response here
      },
      complete: () => {
        // Handle the completion logic here (if needed)
      }
    });
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowList']?.currentValue.length) {
      this.dataSource.data = this.rowList;
      this.dataSource.sort = this.sort;
    }
  }

  search(value: string): void {
    this.devSrv.search(value).subscribe({
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



  announceSortChange(sortState: Sort) {
 
    if (sortState.direction) {
      this.matDataSource.sort =this.sort
       }
  }

test(event:any,value: string){
  event.preventDefault()
  console.log(event)
  this.search(value)
}


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ModalAddComponent, {
  //     width: '250px',
  //     // data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }

  
}
