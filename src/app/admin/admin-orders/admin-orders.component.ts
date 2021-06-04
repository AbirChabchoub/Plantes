import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
orders:any
  constructor(private ordersService:OrdersService,
    private router:Router) { }

  ngOnInit() {
    this.getAllOrders()
  }

getAllOrders(){
this.ordersService.getAllOrders().subscribe(
  (data)=>{
    this.orders=data.orders
  }
)
}


DeleteOrder(id:any){
  this.ordersService.deleteFromOrder(id).subscribe(
    ()=>{
      console.log('order deleted successfully by admin');
      this.getAllOrders();
    });
}

generatePDF(){
  this.ordersService.getOrdersPdf().subscribe((data)=>{
    console.log('here message from pdf generator',data.message);
  });
}

goToOrderDetails(id:any){
  this.router.navigate([ `orderDetails/${id}` ]);

}

}
