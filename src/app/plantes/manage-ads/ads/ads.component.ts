import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from 'src/app/admin/Admin-services/add-catogory.service';

@Component({
	selector: 'app-ads',
	templateUrl: './ads.component.html',
	styleUrls: [ './ads.component.scss' ]
})
export class AdsComponent implements OnInit {
	ads: any;
	term: any;
	categories: any;
	categoryName: String;
	pageOfItems: Array<any>;
	items = [];
	constructor(private adService: AdsService, private addCategoryService: AddCatogoryService) {}

	ngOnInit() {
		this.getAllCategories();
		this.adService.getAllAds().subscribe((data) => {
			this.ads = data.ads;
			console.log('here data ads', this.ads);
			var findedObj;
			// for (let i = 0; i < data.ads[i].length; i++) {
			//   if (data.ads[i].vendu === 'false') {
			//     findedObj = data.ads[i]
			//     console.log('heheheheheh', findedObj);
			//   }
			//   // return findedObj
			// }
		});
	}

	getAllCategories() {
		this.addCategoryService.getAllCategories().subscribe((data) => {
			console.log('here categories', data.category);
			this.categories = data.category;
		});
	}

	clickme($event) {
		const evtMsg = $event.target.textContent;
		this.categoryName = evtMsg;
		alert(this.categoryName);
	}
}
