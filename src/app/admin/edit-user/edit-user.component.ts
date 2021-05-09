import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from 'src/app/functions/confirmPwd';
import { AdminUsersService } from '../Admin-services/admin-users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: any = {};
  updateProfileForm: FormGroup;
  id: any;
  constructor(private formBuilder: FormBuilder, 
    private adminService: AdminUsersService, 
    private usersService:UsersService,
    private route: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getUserByIdFromAdmin(this.id).subscribe(
      (data) => {
        this.user = data.user
      });


    this.updateProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      tel: ['', [Validators.pattern("[0-9]{8}"), Validators.required]],
      pwd: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      confirmPassword: ['']
    },
      { validator: MustMatch('pwd', 'confirmPassword') }
    );


  }



  editProfil() {
    this.adminService.updateUser(this.user).subscribe(
      (data) => {
        console.log('your profile is successfully updated', data.message);
        this.route.navigate(['profile']);
      });
    
  }






}
