import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any;
  ads: any;
  id: any;
  user: any = {}
  constructor(private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router:Router) { }

  ngOnInit() {
    var connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getConnectedUser(this.id).subscribe((data) => {
      this.user = data.users;
    });

    this.wishlistService.getMyWishlist(this.id).subscribe(
      (data) => {
        this.wishlist = data.wishlist;
       
      });


  }
  deleteFromWishlist(id: any) {
    this.wishlistService.removeFromWishlist(id).subscribe(
      (data) => {
        console.log(' deleted from wishlist successfully', id);
        this.wishlistService.getMyWishlist(this.id).subscribe(
          (data) => {
            this.wishlist = data.wishlist;
            console.log('heere ', data.wishlist);
          });
      });

  }

	goToEditProfile() {
		let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
		this.router.navigate([ `editProfile/${connectedUserId}` ]);
	}


}
