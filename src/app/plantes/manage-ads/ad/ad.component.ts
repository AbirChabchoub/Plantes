import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { JsonPipe } from '@angular/common';
import { AdsService } from 'src/app/services/ads.service';
import { Route } from '@angular/compiler/src/core';

@Component({
	selector: 'app-ad',
	templateUrl: './ad.component.html',
	styleUrls: [ './ad.component.scss' ]
})
export class AdComponent implements OnInit {
	@Input() adsInput: any;
	addedToWishlist: boolean = false;
	wishlist: any = {};
	ads:any;
	constructor(private router: Router, 
		private wishlistService: WishlistService,
		private adsService:AdsService,
		private route:Router) {}

	ngOnInit() {
	
	
	}

	goToProductDetails(id: any) {
		localStorage.setItem('prToReserve', JSON.stringify(id));
		this.router.navigate([ `product-details/${id}` ]);
	}



// getAdsById(id:any){

// 	this.adsService.getAdById(id).subscribe(
// 		(res)=>{
// 	   this.ads=res.ad;
// 	   console.log('hello',this.ads);
	   
// 	   localStorage.setItem('idProductToReserve', JSON.stringify(id));
// 	   this.addedToWishlist = true;
// 	   this.wishlist.wishlistUserId = JSON.parse(localStorage.getItem('connectedUser'));
// 	   this.wishlist.adId = JSON.parse(localStorage.getItem('idProductToReserve'));
// 	   this.wishlist.productName=res.ad.productName;
// 	   this.wishlist.category=res.ad.category;
// 	   this.wishlist.description=res.ad.description;
// 	   this.wishlist.price=res.ad.price;
// 	   this.wishlist.image=res.ad.image;
// 	   this.wishlistService.addToWishlist(this.wishlist).subscribe((data) => {
// 		   console.log('added to wishlist', data.message);
// 	   });
// 	});
// }



getAdsById(id:any) {
	var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
	if (isConnectedUser == null) {
	  this.route.navigate(['login']);

	} else {
		this.adsService.getAdById(id).subscribe(
			(res)=>{
		   this.ads=res.ad;
		   console.log('hello',this.ads);
		   
		   localStorage.setItem('idProductToReserve', JSON.stringify(id));
		   this.addedToWishlist = true;
		   this.wishlist.wishlistUserId = JSON.parse(localStorage.getItem('connectedUser'));
		   this.wishlist.adId = JSON.parse(localStorage.getItem('idProductToReserve'));
		   this.wishlist.productName=res.ad.productName;
		   this.wishlist.category=res.ad.category;
		   this.wishlist.description=res.ad.description;
		   this.wishlist.price=res.ad.price;
		   this.wishlist.image=res.ad.image;
		   this.wishlistService.addToWishlist(this.wishlist).subscribe((data) => {
			   console.log('added to wishlist', data.message);
		   });
		});
	}
  }





}
