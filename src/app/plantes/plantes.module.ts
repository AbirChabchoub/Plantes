import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantesRoutingModule } from './plantes-routing.module';
import { BannerComponent } from './banner/banner.component';
import { DealsWeekComponent } from './deals-week/deals-week.component';
import { BlogComponent } from './blog/blog.component';
import { BrandsComponent } from './brands/brands.component';
import { FeaturesComponent } from './features/features.component';

import { HomeComponent } from './home/home.component';
import { ImgCategoriesComponent } from './img-categories/img-categories.component';
import { ImgDealsComponent } from './img-deals/img-deals.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { ManageAdsComponent } from './manage-ads/manage-ads.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FAQComponent } from './faq/faq.component';

import { CommentFormComponent } from './manage-comments/comment-form/comment-form.component';
import { CommentComponent } from './manage-comments/comment/comment.component';
import { CommentsComponent } from './manage-comments/comments/comments.component';

import { ProfileComponent } from './manage-profile/profile/profile.component';
import { EditProfileComponent } from './manage-profile/edit-profile/edit-profile.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ReplyComponent } from './manage-comments/reply/reply.component';
import { ManageAdsModule } from './manage-ads/manage-ads.module';






@NgModule({
  declarations: [BannerComponent, DealsWeekComponent,
    BlogComponent, BrandsComponent, FeaturesComponent,
    HomeComponent, ImgCategoriesComponent,
    ImgDealsComponent, InfoComponent, LoginComponent, ManageAdsComponent,
    ProductDetailsComponent, ProductsComponent, ShopComponent, SignupComponent,
    FAQComponent,
    CommentFormComponent,
    CommentComponent,
    CommentsComponent,   
    ProfileComponent,
    EditProfileComponent,
    JwPaginationComponent,
    ReplyComponent  
  
  ],
  imports: [
    CommonModule,
    PlantesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManageAdsModule
   

  ]
})
export class PlantesModule { }
