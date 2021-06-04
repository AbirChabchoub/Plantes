import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddCatogoryService } from '../Admin-services/add-catogory.service';
import { AdminUsersService } from '../Admin-services/admin-users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  fullName: string

  constructor() { }

  ngOnInit() {
  
      this.fullName=JSON.parse(localStorage.getItem('adminFullName'));
     
  }





}
