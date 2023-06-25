import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  passType: string = "password";

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  change() {
    this.passType = (this.passType === "password") ? 'text' : 'password';
  }


  login() {
      if (this.form.valid) {
        console.log(this.form.value)
        this.loginService.login(this.form.controls["email"].value,this.form.controls["password"].value)
        .subscribe({
          next: (res) => {
            console.log(res)
            if(res){
              // console.log(res)
              console.log(res.data.admin.image)
              this.loginService.setUser(res.data.admin.image,res.data.admin.name)
            
              this.router.navigateByUrl("/")
            }else{
              alert(res)
            }
          },
          error: (error) => {
            console.error(error);
            alert("Failed to login. Please try again later.");
          }
        });
      }}
}
