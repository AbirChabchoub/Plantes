import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

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
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { ApexChartComponent } from './apex-chart/apex-chart.component';
import { ChartsComponent } from './apex-chart/charts/charts.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from '../shared/data-table/data-table.module';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';

import { CategoriesComponent } from './ads/categories/categories.component';
import { AdminQuestionsComponent } from './admin-questions/admin-questions.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';








@NgModule({
	declarations: [ DashboardComponent,  UsersComponent, AddUserComponent, AllAdsComponent, EditUserComponent, AllAdComponent, AdminAdFormComponent, FilterPipe, EditAdComponent, AdminBlogComponent, AllOrdersComponent, ApexChartComponent, ChartsComponent, ChartComponent, ProfilAdminComponent, CategoriesComponent, AdminQuestionsComponent, AdminOrdersComponent, OrderDetailsComponent],
	imports: [ CommonModule, AdminRoutingModule , FormsModule,ReactiveFormsModule,ChartsModule , DataTableModule ]
	
	
})
export class AdminModule {}
