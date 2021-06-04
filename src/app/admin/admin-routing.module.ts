import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdsComponent } from './ads/all-ads/all-ads.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminAdFormComponent } from './ads/admin-ad-form/admin-ad-form.component';
import { EditAdComponent } from './ads/edit-ad/edit-ad.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { CategoriesComponent } from './ads/categories/categories.component';
import { AdminQuestionsComponent } from './admin-questions/admin-questions.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


const routes: Routes = [
	
	 { path:'category',component:CategoriesComponent},
	 { path:'users',component:UsersComponent},
	 { path:'adminAds',component:AllAdsComponent},
	 { path:'addAds',component:AdminAdFormComponent},
	 { path:'addUser',component:AddUserComponent},
	 { path:'editUser/:id',component:EditUserComponent},
	 { path:'dashboard',component:DashboardComponent},
	 {path:'editAd/:id',component:EditAdComponent},
	 {path:'adminBlog',component:AdminBlogComponent},
	 {path:'allOrders',component:AllOrdersComponent},
	 {path:'profilAdmin/:id',component:ProfilAdminComponent},
	 {path:'questions',component:AdminQuestionsComponent},
	 {path:'adminOrders',component:AdminOrdersComponent},
	 {path:'orderDetails/:id',component:OrderDetailsComponent}










];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})


export class AdminRoutingModule {}
