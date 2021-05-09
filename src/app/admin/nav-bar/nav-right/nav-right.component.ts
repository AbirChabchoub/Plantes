import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import{Admin} from '../../../../../backend/models/Admin';
@Component({
	selector: 'app-nav-right',
	templateUrl: './nav-right.component.html',
	styleUrls: [ './nav-right.component.scss' ],
	providers: [ NgbDropdownConfig ]
})
export class NavRightComponent implements OnInit {
	userIsAuthenticated: Admin;

	constructor(private authService: UsersService) {}

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.userIsAuthenticated = x));

	}

	logout() {
		this.authService.logout();
	}



}
