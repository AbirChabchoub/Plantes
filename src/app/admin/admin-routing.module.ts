import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './Admin-ads/add-category/add-category.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdsComponent } from './ads/all-ads/all-ads.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddCatogoryService } from './Admin-services/add-catogory.service';
import { AdFormComponent } from '../plantes/manage-ads/ad-form/ad-form.component';
import { AdminAdFormComponent } from './ads/admin-ad-form/admin-ad-form.component';
import { EditAdComponent } from './ads/edit-ad/edit-ad.component';


const routes: Routes = [
	 { path: 'admin', component: DashboardComponent } ,
	 { path:'addCategory',component:AddCategoryComponent},
	 { path:'users',component:UsersComponent},
	 { path:'adminAds',component:AllAdsComponent},
	 { path:'addAds',component:AdminAdFormComponent},
	 { path:'addUser',component:AddUserComponent},
	 { path:'editUser/:id',component:EditUserComponent},
	 { path:'dashboard/:id',component:DashboardComponent},
	 {path:'addCategory',component:AddCategoryComponent},
	 {path:'editAd/:id',component:EditAdComponent},




];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})


export class AdminRoutingModule {}
