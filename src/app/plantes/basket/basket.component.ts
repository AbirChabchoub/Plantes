import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
total:any;

id: any;
user: any = {};
connectedUser: any;
  constructor(private activatedRoute: ActivatedRoute,
		private usersService: UsersService,) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.usersService.getConnectedUser(this.connectedUser).subscribe((data) => {
			this.user = data.users;
		});
    this.getMyBasket();
  }



	getMyBasket() {
		var basket = JSON.parse(localStorage.getItem('basket') || '[]');
		for (let i = 0; i < basket.length; i++) {
this.total=this.total+basket[i].price
				basket=` <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><strong>Résumé commande</strong></h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-condensed">
                            <thead>
                                <tr>
                                <td><strong>Image du produit</strong></td>
                                    <td><strong>Nom du produit</strong></td>
    
                                                                       
                                    <td class="text-center"><strong> catégorie</strong></td>                                           
                                    <td class="text-right"><strong>Prix initial</strong></td>
                                    <td class="text-right"><strong>Prix livraison </strong></td>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <!-- foreach ($order->lineItems as $line) or some such thing here -->
                                <tr>
                                <td>${basket.image}</td>
                                    <td>${basket.productName}</td>
                                   
                                    <td class="text-center">${basket.category}</td>
                                                                            
                                    <td class="text-right">${basket.price} DT</td>
                                    <td class="text-right">7 DT</td>
                                  
                                </tr>
    
                               
                               
                                <tr>
                                    <td class="no-line"></td>
                                    <td class="no-line"></td>
                                  
                                    <td class="no-line text-center"><strong>Total</strong></td>
                                    <!-- <td class="no-line text-right"></td> -->
                                    <td class="no-line text-right">
                                        ${this.total} DT
                                    </td>
                                </tr>
                            </tbody>
                        </table>
    
                    </div>
                </div>
            </div>
        </div>
    </div>`

			}document.getElementById("basket").innerHTML=basket
		

	}


}
