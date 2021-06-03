import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsService } from 'src/app/services/ads.service';
import { OrdersService } from 'src/app/services/orders.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCommandeComponent } from '../modal-commande/modal-commande.component';
import { BasketService } from 'src/app/services/basket.service';




@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  ad: any;
  id: any;
  connectedUser: any;
  order: any = {};
  vendu: any = {};
  addedToWishlist: boolean = false;
  wishlist: any = {};
  ads: any;
  basket: any = {};
  constructor(private activatedRoute: ActivatedRoute,
    private adsService: AdsService,
    private route: Router,
    private wishlistService: WishlistService,
    public modalService: NgbModal,
    private basketService: BasketService

  ) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adsService.getAdById(this.id).subscribe(
      (data) => {
        this.ad = data.ad;
      });

  }


  verifConnectedUser() {
    var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (isConnectedUser == "null") {
      this.route.navigate(['signup']);

    } else {
      this.route.navigate(['ads']);
    }
  }




  openModal() {

    const modalRef = this.modalService.open(ModalCommandeComponent);
    modalRef.componentInstance.ad = this.ad;
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });


    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }


  getAdsById(id: any) {
    var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (isConnectedUser == null) {
      this.route.navigate(['login']);

    } else {
      this.adsService.getAdById(id).subscribe(
        (res) => {
          this.ads = res.ad;
          console.log('hello', this.ads);

          localStorage.setItem('idProductToReserve', JSON.stringify(id));
          this.addedToWishlist = true;
          this.wishlist.wishlistUserId = JSON.parse(localStorage.getItem('connectedUser'));
          this.wishlist.adId = JSON.parse(localStorage.getItem('idProductToReserve'));
          this.wishlist.productName = res.ad.productName;
          this.wishlist.category = res.ad.category;
          this.wishlist.description = res.ad.description;
          this.wishlist.price = res.ad.price;
          this.wishlist.image = res.ad.image;
          this.wishlistService.addToWishlist(this.wishlist).subscribe((data) => {
            console.log('added to wishlist', data.message);
          });
        });
    }
  }

  addToBasket(id: any) {
    var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (isConnectedUser == null) {
      this.route.navigate(['login']);

    } else {
      this.adsService.getAdById(id).subscribe(
        (res) => {
          this.ads = res.ad;
          console.log('hello', this.ads);
          var commandeId = JSON.parse(localStorage.getItem('commandeId') || '1');
          var commande = {
            id: (commandeId),
            adId: res.ad._id,
            img: res.ad.image,
            idUser: isConnectedUser,
            productName: (res.ad.productName),
            category: res.ad.category,
            price: res.ad.price
          }
          var V = JSON.parse(localStorage.getItem('basket') || '[]');
          V.push(commande);
          localStorage.setItem('basket', JSON.stringify(V));
          localStorage.setItem('commandeId', (commandeId) + 1);





          //  this.basket.wishlistUserId = JSON.parse(localStorage.getItem('connectedUser'));
          //  this.basket.adId = JSON.parse(localStorage.getItem('idProductToReserve'));
          //  this.basket.productName=res.ad.productName;
          //  this.basket.category=res.ad.category;
          //  this.basket.description=res.ad.description;
          //  this.basket.price=res.ad.price;
          //  this.basket.image=res.ad.image;
          //  this.wishlistService.addToWishlist(this.wishlist).subscribe((data) => {
          //    console.log('added to wishlist', data.message);
          //  });
        });
    }
  }



}
