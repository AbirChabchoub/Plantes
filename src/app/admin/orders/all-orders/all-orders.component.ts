import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
orders:any;
  constructor(private orderService:OrdersService,
    private router:Router) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      (data)=>{
    this.orders=data.orders
      });

  }

deleteFromOrders(id:any){
  this.orderService.deleteFromOrder(id).subscribe(
    ()=>{
      console.log('order deleted successfully');
      this.orderService.getAllOrders().subscribe(
        (data)=>{
      this.orders=data.orders
        });
    });
}

getAllOfOrders(){
  this.orderService.getAllOrders().subscribe(
    (data)=>{
  this.orders=data.orders
    });
}




}
