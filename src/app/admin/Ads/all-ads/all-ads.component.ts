import { Component, OnInit, Input } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss']
})
export class AllAdsComponent implements OnInit {
  ads: any;
 
  constructor(private adService:AdsService) { }

  ngOnInit() {
    this.adService.getAllAds().subscribe(
      (data) => {
        this.ads = data.ads;
      }
    )

  }

}
