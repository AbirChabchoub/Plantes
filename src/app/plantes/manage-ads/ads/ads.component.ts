import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from 'src/app/admin/Admin-services/add-catogory.service';
import { ActivatedRoute, Router } from '@angular/router';

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
	constructor(
		private adService: AdsService,
		private addCategoryService: AddCatogoryService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.getProducts(String(params['category']));
		});
	}

	ngOnInit() {
		this.getAllCategories();

		this.getProducts();
	}
	getProducts(categoryName?: string): void {
		if (categoryName) {
			this.adService.getAllAds().subscribe((products) => {
				this.ads = products.ads.filter((product: any) => product.category === categoryName);
			});
		} else {
			this.adService.getAllAds().subscribe((products) => (this.ads = products.ads));
		}
	}
	filterProducts(category: any) {
		this.router.navigate([ '/ads' ], { queryParams: { category: category.categoryName } });
	}

	getAllCategories() {
		this.addCategoryService.getAllCategories().subscribe((data) => {
			console.log('here categories', data.category);
			this.categories = data.category;
		});
	}
	allCategory() {
		this.adService.getAllAds().subscribe((res) => {
			this.ads = res.ads;
		});
	}

	clickme($event) {
		const evtMsg = $event.target.textContent;
		this.categoryName = evtMsg;
		alert(this.categoryName);
	}
}
