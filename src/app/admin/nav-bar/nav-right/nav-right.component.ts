import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import{Admin} from '../../../../../backend/models/Admin';
import { AdminUsersService } from '../../Admin-services/admin-users.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-nav-right',
	templateUrl: './nav-right.component.html',
	styleUrls: [ './nav-right.component.scss' ],
	providers: [ NgbDropdownConfig ]
})
export class NavRightComponent implements OnInit {
	adminIsAuthenticated: Admin;
	fullName: string;
	id:any;
	admin:any;
	constructor(private authService: AdminUsersService,
		private router:Router) {}

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.adminIsAuthenticated = x));
		this.fullName=JSON.parse(localStorage.getItem('adminFullName'));
		// this.id=  this.fullName=JSON.parse(localStorage.getItem('connectedAdmin'));
		this.authService.getAdminById(this.adminIsAuthenticated).subscribe(
			(data)=>{
			 this.admin=data.admin
			});

	}

	logout() {
		this.authService.logout();
	}

	goToEditProfile() {
		let connectedAdmin = JSON.parse(localStorage.getItem('connectedAdmin'));
		this.router.navigate([ `profilAdmin/${connectedAdmin}` ]);
	}

}
