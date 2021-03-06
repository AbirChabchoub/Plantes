import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/functions/confirmPwd';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: any ={};
  updateProfileForm: FormGroup;
  id: any;
  imagePreview: String;
  constructor(private formBuilder: FormBuilder, 
    private usersService: UsersService, 
    private route: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getConnectedUser(this.id).subscribe(
      (data) => {
        this.user = data.users
      });


    this.updateProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      tel: ['', [Validators.pattern("[0-9 ]{8}"), Validators.required]],
      pwd: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      confirmPassword: [''],
      image: ['']
    },
      { validator: MustMatch('pwd', 'confirmPassword') }
    );





  }


  editProfil() {
    let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));		
    this.usersService.updateProfil(this.user,this.updateProfileForm.value.image).subscribe(
      (data) => {
        console.log('your profile is successfully updated', data.message);
        this.route.navigate([ `profile/${connectedUserId}` ]);
      });   
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateProfileForm.patchValue({ image: file });
    this.updateProfileForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
