import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './Admin-ads/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdsComponent } from './ads/all-ads/all-ads.component';




@NgModule({
	declarations: [ DashboardComponent, AddCategoryComponent, UsersComponent, AddUserComponent, AllAdsComponent ],
	imports: [ CommonModule, AdminRoutingModule , FormsModule]
	
	
})
export class AdminModule {}
