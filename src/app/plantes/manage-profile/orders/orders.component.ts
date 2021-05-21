import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AdsService } from 'src/app/services/ads.service';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private usersService: UsersService,
    private adsService: AdsService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrdersService) { }
  id: any;
  user: any = {};
  connectedUser: any;
  ad: any;
  orders: any;
  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getConnectedUser(this.id).subscribe((data) => {
      this.user = data.users;
    });
    this.getMyOrders();
  }


  getMyOrders() {    
    this.orderService.getOrderByUserId(this.id).subscribe(
      (data) => {
        this.orders = data.order
        console.log('here in get my orders',this.orders);
        
      });
      
      
  }


}
