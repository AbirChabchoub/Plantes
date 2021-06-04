import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '../Admin-services/admin-users.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  loginAdminForm:FormGroup;
  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private adminService:AdminUsersService) { }

  ngOnInit() {
this.loginAdminForm=this.formBuilder.group({
  loginAdminEmail: ['', [Validators.email, Validators.required]],
  loginAdminPassword: ['', Validators.required]
})
  }


  validateLogin(user) {
    this.adminService.login(user);
    let connectedAdminId = JSON.parse(localStorage.getItem('connectedAdmin'));
            // this.router.navigate([ `dashboard/${connectedAdminId}` ]); 
            this.router.navigate([ '/dashboard' ]);   
  }
  
}
