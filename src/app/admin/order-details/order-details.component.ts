import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { printDiv } from 'src/app/functions/printDiv';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id: any;
  order: any
  user: any;
  date:any;
  constructor(private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService, private  userService:UsersService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.ordersService.getOrderById(this.id).subscribe(
      (data) => {
        this.order = data.order
        this.userService.getConnectedUser(this.order.orderUserId).subscribe((res)=>{
          this.user=res.users
          console.log('here user' , this.user);
          
        })
      });
      this.getDate();
  }
  printPage() {
		printDiv('registration');
  }
  
  getDate(){
    this.date=new Date().getDate().toString() + '-' +(new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
  }

}
