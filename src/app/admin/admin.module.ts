import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './Admin-ads/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdsComponent } from './ads/all-ads/all-ads.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllAdComponent } from './ads/all-ad/all-ad.component';
import { AdFormComponent } from '../plantes/manage-ads/ad-form/ad-form.component';
import { AdminAdFormComponent } from './ads/admin-ad-form/admin-ad-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EditAdComponent } from './ads/edit-ad/edit-ad.component';






@NgModule({
	declarations: [ DashboardComponent, AddCategoryComponent, UsersComponent, AddUserComponent, AllAdsComponent, EditUserComponent, AllAdComponent, AdminAdFormComponent, FilterPipe, EditAdComponent],
	imports: [ CommonModule, AdminRoutingModule , FormsModule,ReactiveFormsModule]
	
	
})
export class AdminModule {}
