import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from 'src/app/admin/Admin-services/add-catogory.service';

@Component({
  selector: 'app-prods',
  templateUrl: './prods.component.html',
  styleUrls: ['./prods.component.scss']
})
export class ProdsComponent implements OnInit {

  constructor(private adService: AdsService, private AddCategoryService: AddCatogoryService) { }
  ads: any;
  ngOnInit() {
    this.adService.getAllAds().subscribe(
      (data) => {
        this.ads = data.ads;
      }
    )
  }


  getEmittedVal(selectedItem: string) {
    console.log('selectedItem', selectedItem);
    alert(selectedItem);
  }


}
