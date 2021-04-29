import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-ad',
	templateUrl: './ad.component.html',
	styleUrls: [ './ad.component.scss' ]
})
export class AdComponent implements OnInit {
	@Input() adsInput: any;
	addedToWishlist: boolean = false;
	wishlist: any = {};
	constructor(private router: Router, private wishlistService: WishlistService) {}

	ngOnInit() {
	
	}

	goToProductDetails(id: any) {
		localStorage.setItem('prToReserve', JSON.stringify(id));
		this.router.navigate([ `product-details/${id}` ]);
	}

	deleteFromWishlist(id: any) {
		this.addedToWishlist = false;
		this.wishlistService.removeFromWishlist(id).subscribe((data) => {
			console.log(' deleted from wishlist successfully', data.message);
		});
	}

	addToWishlist(id: any) {
		localStorage.setItem('idProductToReserve', JSON.stringify(id));
		this.addedToWishlist = true;
		this.wishlist.wishlistUserId = JSON.parse(localStorage.getItem('connectedUser'));
		this.wishlist.adId = JSON.parse(localStorage.getItem('idProductToReserve'));
		this.wishlistService.addToWishlist(this.wishlist).subscribe((data) => {
			console.log('added to wishlist', data.message);
		});
	}
}
