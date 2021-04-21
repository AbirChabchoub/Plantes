import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsComponent } from './ads/ads.component';
import { AdFormComponent } from './ad-form/ad-form.component';
import { FormsModule } from '@angular/forms';
import { AdComponent } from './ad/ad.component';
import { ItemsComponent } from './items/items.component';
import { ProdsComponent } from './prods/prods.component';
import { TestPipe } from '../pipes/test.pipe';



@NgModule({
  declarations: [TestPipe, AdsComponent,AdFormComponent,AdComponent, ItemsComponent, ProdsComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports:[AdComponent ],
})
export class ManageAdsModule { }
