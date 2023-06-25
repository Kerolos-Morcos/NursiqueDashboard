import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDevice } from '../models/device';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-editDevice',
  templateUrl: './editDevice.component.html',
  styleUrls: ['./editDevice.component.css']
})
export class EditDeviceComponent implements OnInit {


  data:FormData
  form!: FormGroup;
  oldProduct:IDevice;
  id:string=""
  isLoading=false;
  fileName =''

  imageslist: File[] = [];
  imagesURL: any[] = [ ];
  constructor(
    private router:Router,
    private builder: FormBuilder,
    private prdSrv:DeviceService,
    private activRoute :ActivatedRoute) {
    this.data = new FormData()
    this.oldProduct = {
      _id: '',
      name: '',
      price: '',
      details: '',
      joinedDate: new Date(),
      quantity: '',
      category: '',
      status: 'available',
      image :[''],
    };
  }
  ngOnInit() {
    this.activRoute.params.subscribe({
      next:(prams)=>{
        this.id = prams["id"]
        this.prdSrv.getByID(prams["id"]).subscribe({
          next:(res)=>{
            this.oldProduct = res.data as IDevice;
            this.imagesURL= this.oldProduct.image
            this.buildForm()
            this.isLoading = true
          }
        })
      }
    })
  }

  add(event: any) {
    if (event.target.files && event.target.files.length > 0) {

      for (let index = 0; index <event.target.files.length; index++) {
        this.imageslist.push(event.target.files[index]);
        this.data.append('image',event.target.files[index])
        this.imagesURL.unshift("ffffff");
     }
      //append the images to the form data
 //     this.form.patchValue({ images: this.imageslist });
    }
   console.log(this.imageslist);
}

  buildForm(){
    this.form = this.builder.group({
      name: [this.oldProduct.name, [Validators.required]],
      price: [this.oldProduct.price, [Validators.required]],
      details: [this.oldProduct.details, [Validators.required]],
      quantity: [this.oldProduct.quantity, [Validators.required]],
      category: [this.oldProduct.category],
    })
  }
  send() {
    
    console.log(this.form.value)
    console.log(this.id)
    for (const key in this.form.controls) {
      this.data.append(key,this.form.controls[key].value)
    }
    this.prdSrv.update(this.data,this.id).subscribe({
      next: (res)=>{
        if(res.success){
          this.router.navigateByUrl('/device')
        }
        else{
          alert(res.message)
        }
        console.log(res);
      }
    })

  }
}
