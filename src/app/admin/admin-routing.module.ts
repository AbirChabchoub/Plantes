import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './Admin-ads/add-category/add-category.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdsComponent } from './ads/all-ads/all-ads.component';

const routes: Routes = [
	 { path: 'admin', component: DashboardComponent } ,
	 { path:'addCategory',component:AddCategoryComponent},
	 { path:'users',component:UsersComponent},
	//  { path:'addUser',component:UsersComponent},
	 { path:'adminAds',component:AllAdsComponent},
	//  { path:'addAds',component:UsersComponent},
	 { path:'addUser',component:AddUserComponent},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})


export class AdminRoutingModule {}
