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
  admin: any = {};
  id: any
  constructor(private adminService: AdminUsersService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getAdminById(this.id).subscribe(
      (data) => {
        this.admin = data.admin;

      });
  }





}
