import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from '../../../../backend/models/user';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	userIsAuthenticated: User;
	user: any
	basketNb: any = 0;
	constructor(private authService: UsersService,
		 private router: Router) { }

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => {
			this.userIsAuthenticated = x


		});
		this.authService.getConnectedUser(this.userIsAuthenticated).subscribe((data) => {
			console.log('here connected user', data.users);
			this.user = data.users

		});
		this.getMyBasket();
	}

	logout() {
		this.authService.logout();
	}

	goToProfile() {
		let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
		this.router.navigate([`profile/${connectedUserId}`]);
	}

	goToOrders() {
		let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
		this.router.navigate([`orders/${connectedUserId}`]);
	}
	goToMyWishlist() {
		let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
		this.router.navigate([`wishlist/${connectedUserId}`]);
	}

	getMyBasket() {
		let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
		let basket = JSON.parse(localStorage.getItem('basket') || '[]');
		for (let i = 0; i < basket.length; i++) {
			if (basket[i].idUser == connectedUserId) {
				this.basketNb = this.basketNb + 1;
				console.log(this.basketNb);

			}
		}

	}


goToMyBasket(){
	this.router.navigate(['/basket']);

}

}
