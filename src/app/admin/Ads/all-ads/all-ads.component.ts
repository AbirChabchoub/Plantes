import { Component, OnInit, Input } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from '../../Admin-services/add-catogory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss']
})
export class AllAdsComponent implements OnInit {
  ads: any;

  constructor(private adService: AdsService,
    private addCategoryService: AddCatogoryService,
    private router: Router) { }

  ngOnInit() {
    this.getAllAds()

  }

  deleteAdByAdmin(id: any) {
    this.addCategoryService.deleteAdByAdmin(id).subscribe(
      () => {
        console.log('ad deleted successfully by admin');
        this.getAllAds()
      });
  }
  getAllAds() {
    this.adService.getAllAds().subscribe(
      (data) => {
        this.ads = data.ads;
      });
  }
  // goToUpdateAd(id:any){
  // this.router.navigate([''])
  // }

}
