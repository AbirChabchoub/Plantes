import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AdsService } from 'src/app/services/ads.service';
import { AdminUsersService } from '../../Admin-services/admin-users.service';
import { AddCatogoryService } from '../../Admin-services/add-catogory.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-all-ad',
  templateUrl: './all-ad.component.html',
  styleUrls: ['./all-ad.component.scss']
})
export class AllAdComponent implements OnInit {
  @Input() adsInput: any;
  wishlist: any = {};
  ads: any = {};
  constructor(private router: Router,
    private wishlistService: WishlistService,
    private adsService: AdsService,
    private adminAdsService:AddCatogoryService) { }

  ngOnInit() {
    this.getAllAds();
  }


  // deleteAd(id: any) {
  //   this.adsService.deleteAd(id).subscribe(
  //     (data) => {
  //       console.log('add deleted succssfully',data.message);
  //       this.getAllAds();
  //     });

  // }

  getAllAds() {
    this.adsService.getAllAds().subscribe(
      (data) => {
        this.ads = data.ads;
      });
  }

  deleteAdFromAdmin(id:any){
this.adminAdsService.deleteAd(id).subscribe(
  ()=>{
console.log('ad deleted succssefully from admin');
this.getAllAds();
});
  }



  goToEditAd(id:any){
    localStorage.setItem('adToEdit',JSON.stringify(id));
    this.router.navigate([`editAd/${id}`]);
  }

}
