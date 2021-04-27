import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-ad',
	templateUrl: './ad.component.html',
	styleUrls: [ './ad.component.scss' ]
})
export class AdComponent implements OnInit {
	@Input() adsInput: any;
	constructor(private router: Router) {}

	ngOnInit() {}

	goToProductDetails(id: any) {
		localStorage.setItem('prToReserve', JSON.stringify(id));
		this.router.navigate([ `product-details/${id}` ]);
	}
}
