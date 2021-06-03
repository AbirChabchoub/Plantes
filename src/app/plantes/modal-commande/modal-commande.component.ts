import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-modal-commande',
  templateUrl: './modal-commande.component.html',
  styleUrls: ['./modal-commande.component.scss']
})
export class ModalCommandeComponent implements OnInit {
  connectedUser: any;
  order: any = {};
  vendu: any = {};
  @Input() public id;
  @Input() public ad;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private orderService: OrdersService, private adsService: AdsService, private route: Router,) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    console.log('here id', this.id);


  }

  passBack() {
    this.passEntry.emit(this.ad);
    this.activeModal.close(this.ad);
  }
  addToCart() {
    if (this.connectedUser == null) {
      this.passBack()
      this.route.navigate(['login']);


    } else {
      this.adsService.getAdById(this.id).subscribe(
        (data) => {
          console.log(data.ad);
          this.vendu = data.ad
          this.vendu.vendu = true
          this.adsService.vendu(this.vendu).subscribe((res) => {
            console.log(res.message);

          })

          this.order.productId = this.id;
          this.order.orderUserId = this.connectedUser;
          this.order.productName = data.ad.productName;
          this.order.category = data.ad.category;
          this.order.price = data.ad.price;
          this.order.image = data.ad.image;
          this.order.vendu = this.vendu.vendu;
          this.orderService.addOrder(this.order).subscribe(
            () => {
              console.log('order added successfully', this.order);
              this.passBack()

            });
        });

    }

  }

}
