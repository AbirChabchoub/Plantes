import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: any = {};

  constructor(private router: Router, private userService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginEmail: ['',[Validators.email,Validators.required]],
      loginPwd: ['',[Validators.required]]
    })
  }

  toSignup() {
    this.router.navigate(['signup']);
  }

  validateLogin(user) {
    this.userService.login(user);
    // this.router.navigate(['ads']);
  }



}
