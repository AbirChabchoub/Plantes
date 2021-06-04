import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from 'src/app/functions/confirmPwd';
import { AdminUsersService } from '../Admin-services/admin-users.service';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.scss']
})
export class ProfilAdminComponent implements OnInit {
  updateProfilAdmin: FormGroup;
  id: any;
  imagePreview: String;
  admin:any;
  constructor(private route: Router, 
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private adminService:AdminUsersService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getAdminById(this.id).subscribe(
      (data) => {
        this.admin = data.admin
      });


    this.updateProfilAdmin = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      adminEmail: ['', [Validators.required]],
      adminPassword: ['', [Validators.required]],
      adminConfirmPassword: ['', [Validators.required]],
      image: ['']
    },
      { validator: MustMatch('adminPassword', 'adminConfirmPassword') }
    );
  }


  editProfil() {
    let connectedAdmin = JSON.parse(localStorage.getItem('connectedAdmin'));		
    this.adminService.updateProfil(this.admin,this.updateProfilAdmin.value.image).subscribe(
      (data) => {
        console.log('your profile is successfully updated', data.message);
        this.route.navigate([ `/dashboard` ]);
      });   
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateProfilAdmin.patchValue({ image: file });
    this.updateProfilAdmin.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }




}
