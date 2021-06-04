import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AdminUsersService } from '../Admin-services/admin-users.service';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/functions/confirmPwd';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.scss']
})
export class SignupAdminComponent implements OnInit {
  signupAdmin:FormGroup;
user:any={}
  constructor(private adminService:AdminUsersService,
    private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
this.signupAdmin=this.formBuilder.group({
  fullName: ['', [Validators.required]],
  adminEmail: ['', [Validators.email, Validators.required]],
  adminPassword: ['', Validators.required],
  adminConfirmPassword: ['']
},
  { validator: MustMatch('adminPassword', 'adminConfirmPassword') }
);
};
  

  signup(admin: any) {
        console.log('here my user', admin);
        // this.insertToDB("users", user);
        this.adminService.signupAdmin(admin).subscribe(
          (data) => {
            console.log(data.message);
            // let connectedAdminId = JSON.parse(localStorage.getItem('connectedAdmin'));
            this.router.navigate([ `loginAdmin` ]);    
          });
      }




}