import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddCatogoryService } from '../../Admin-services/add-catogory.service';
import { ToastType, Toaster } from 'ngx-toast-notifications';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: [ './categories.component.scss' ]
})
export class CategoriesComponent implements OnInit {
	category: any = {};
	addCategory: FormGroup;
	AllCategory: any;
	private types: Array<ToastType> = [ 'success' ];
	private text = ' √ La catégorie est bien ajouté';
	constructor(
		private categoryService: AddCatogoryService,
		private formBuilder: FormBuilder,
		private toaster: Toaster
	) {}

	ngOnInit() {
		this.addCategory = this.formBuilder.group({
			categoryName: [ '' ]
		});
		this.getAllCategories();
	}

	addCategoryToSelect() {
		this.categoryService.AddCategory(this.category).subscribe((data) => {
			console.log(data.message);
			console.log('here category name', this.category);
		});
		this.showToast();
	}

	getAllCategories() {
		this.categoryService.getAllCategories().subscribe((data) => {
			this.AllCategory = data.category;
		});
	}

	get randomType() {
		return this.types[Math.ceil(Math.random() * 8) % this.types.length];
	}

	showToast() {
		const type = this.randomType;
		this.toaster.open({
			caption: this.text,
			type: type
		});
	}

	deleteCategory(id) {
		this.categoryService.deleteCategory(id).subscribe((data) => {
			console.log(data.message);
			this.getAllCategories();
		});
	}
}
