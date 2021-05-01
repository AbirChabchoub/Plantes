import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-all-ad',
  templateUrl: './all-ad.component.html',
  styleUrls: ['./all-ad.component.scss']
})
export class AllAdComponent implements OnInit {
	@Input() adsInput: any;
  wishlist: any = {};
  ads: any={};
  constructor(private router: Router, 
    private wishlistService: WishlistService,
    private adsService:AdsService) { }

  ngOnInit() {
    this.adsService.getAllAds().subscribe(
      (data) => {
        this.ads = data.ads;
      }
    )
  }


deleteAd(id:any){
this.adsService.deleteAd(id).subscribe(
  ()=>{
console.log('add deleted succssfully');
  });
}

}
