import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsService } from 'src/app/services/ads.service';
import { FormBuilder } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  ad: any;
  id: any;
  connectedUser:any;
  order:any={}
  constructor(private activatedRoute: ActivatedRoute,
     private adsService: AdsService,
     private route:Router,
     private orderService:OrdersService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adsService.getAdById(this.id).subscribe(
      (data) => {

        this.ad = data.ad;
        
        
      }
    )
  }


verifConnectedUser(){
   this.connectedUser=JSON.parse(localStorage.getItem('connectedUser'));
  if (this.connectedUser) {
    this.route.navigate(['ads']);

  } else{
    this.route.navigate(['signup']);
  }


}


addToCart(){
this.order.orderUserId=localStorage.getItem(JSON.parse('connectedUser'));




}


}