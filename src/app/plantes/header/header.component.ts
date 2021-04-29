import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from '../../../../backend/models/user';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
	userIsAuthenticated: User;

	constructor(private authService: UsersService, private router: Router) {}

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.userIsAuthenticated = x));
	}

	logout() {
		this.authService.logout();
	}

	goToProfile() {
		let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
		this.router.navigate([ `profile/${connectedUserId}` ]);
	}
}
