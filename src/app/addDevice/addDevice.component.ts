import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-addDevice',
  templateUrl: './addDevice.component.html',
  styleUrls: ['./addDevice.component.css']
})
export class AddDeviceComponent  {

  form!: FormGroup;
  data: FormData;
  imageslist: File[] = [];
  imagesURL: any[] = [
    "https://www.pic.com/wp-content/uploads/sites/3/2019/01/cropped-cropped-pic_logo2.png?fit=174%2C250",
    "https://www.pic.com/wp-content/uploads/sites/3/2019/01/cropped-cropped-pic_logo2.png?fit=174%2C250",
    "https://www.pic.com/wp-content/uploads/sites/3/2019/01/cropped-cropped-pic_logo2.png?fit=174%2C250",
  ];

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private devSrv: DeviceService
  ) {
    this.data = new FormData()

    this.form = this.builder.group({
      name: [' ', [Validators.required]],
      price: [' ', [Validators.required]],
      quantity: [' ', [Validators.required]],
      category: [' ', [Validators.required]],
      details: [' ', [Validators.required]],
       image: [''],
      // images: ,
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  fileName =''
  get images() {
    return this.form.get('image') as FormArray;
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




  remove(index: number) {
    // Implement the remove logic here
  }

  save() {
     console.log(this.form.value);
  }

  send() {
    // const data = new FormData();
    // remove the creation of the data objectand append the images to the form data directly
    for (const key in this.form.controls) {
      this.data.append(key, this.form.controls[key].value);
    }
        console.log(this.data);
    // pass the form data to the devSrv.add() method
    this.devSrv.add(this.data).subscribe({
      next: (res) => {
        if (res.success) {
          alert("Success!");
          this.router.navigateByUrl('/device');
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert("An error occurred while sending the data.");
      }
    });
  }


}
