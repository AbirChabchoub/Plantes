import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/functions/confirmPwd';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  user: any;
  message: String;
  url:String;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.url=this.router.url;
    this.signupForm = this.formBuilder.group({
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


  signup(user: any) {
user.role=(this.url=='/signup')? 'user' : 'admin' ; //comment affecter role dans la partie FE 
    console.log('here my user', user);
    // this.insertToDB("users", user);
    this.usersService.addUserToDB(user).subscribe(
      (data) => {
        console.log(data.message);
        this.router.navigate(['ads']);

      }
    )
  }



  // insertToDB(key: any, object: any) {
  //   let V = JSON.parse(localStorage.getItem(key) || '[]');
  //   V.push(object);
  //   localStorage.setItem("users", JSON.stringify(V));
  // }




}
