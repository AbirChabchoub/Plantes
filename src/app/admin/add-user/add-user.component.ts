import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/functions/confirmPwd';
import { AdminUsersService } from '../Admin-services/admin-users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm:FormGroup;
  user:any={}
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private adminUsersService:AdminUsersService) { }

  ngOnInit(): void {
   
    this.addUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      tel: ['', [Validators.pattern("[0-9 ]{8}"), Validators.required]],
      pwd: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      confirmPassword: ['']
    },
      { validator: MustMatch('pwd', 'confirmPassword') }
    );
  }

addUser(user:any){
  this.adminUsersService.addUser(user).subscribe(
    (data)=>{
      console.log('user added succesfylly in admin',data.message);
      
    })
}

  
}
