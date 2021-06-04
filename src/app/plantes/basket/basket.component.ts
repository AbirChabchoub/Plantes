import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-basket',
	templateUrl: './basket.component.html',
	styleUrls: [ './basket.component.scss' ]
})
export class BasketComponent implements OnInit {
	total = 0;
	basket: any;

	id: any;
	user: any = {};
	connectedUser: any;
	constructor(private activatedRoute: ActivatedRoute, private usersService: UsersService) {}

	ngOnInit() {
		this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.usersService.getConnectedUser(this.connectedUser).subscribe((data) => {
			this.user = data.users;
		});
		this.getMyBasket();
	}

	getMyBasket() {
		this.basket = JSON.parse(localStorage.getItem('basket') || '[]');
		console.log('here basket', this.basket);
		for (let i = 0; i < this.basket.length; i++) {
			this.total = this.total + this.basket[i].price;
		}
		console.log('here total', this.total);
	}
}
