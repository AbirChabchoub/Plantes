import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdFormComponent } from './manage-ads/ad-form/ad-form.component';
import { AdsComponent } from './manage-ads/ads/ads.component';
import { BlogComponent } from './blog/blog.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FAQComponent } from './faq/faq.component';

import { ProfileComponent } from './manage-profile/profile/profile.component';
import { EditProfileComponent } from './manage-profile/edit-profile/edit-profile.component';
import { OrdersComponent } from './manage-profile/orders/orders.component';
import { AdminComponent } from '../admin/admin.component';
import { WishlistComponent } from './manage-profile/wishlist/wishlist.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'adForm', component: AdFormComponent },
	{ path: 'ads', component: AdsComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'signupAdmin', component: SignupComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'product-details/:id', component: ProductDetailsComponent },
	{ path: 'forum', component: FAQComponent },
	{ path: 'profile/:id', component: ProfileComponent },
	{ path: 'editProfile/:id', component: EditProfileComponent },
	{ path: 'orders/:id', component: OrdersComponent },
	{ path: 'wishlist/:id', component:WishlistComponent }

	// {path:'admin',component:AdminComponent}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PlantesRoutingModule {}
