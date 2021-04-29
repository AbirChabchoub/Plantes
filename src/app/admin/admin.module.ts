import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './Admin-ads/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdsComponent } from './ads/all-ads/all-ads.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllAdComponent } from './ads/all-ad/all-ad.component';




@NgModule({
	declarations: [ DashboardComponent, AddCategoryComponent, UsersComponent, AddUserComponent, AllAdsComponent, SignupAdminComponent, EditUserComponent, AllAdComponent ],
	imports: [ CommonModule, AdminRoutingModule , FormsModule,ReactiveFormsModule]
	
	
})
export class AdminModule {}
