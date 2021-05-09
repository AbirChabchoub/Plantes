import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AdsService } from 'src/app/services/ads.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(	private usersService: UsersService,
    private adsService: AdsService, 
    private activatedRoute:ActivatedRoute) { }
    id: any;
    user: any = {};
    connectedUser: any;
    ad: any;
  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.usersService.getConnectedUser(this.id).subscribe((data) => {
			this.user = data.users;
		});

  }

}
