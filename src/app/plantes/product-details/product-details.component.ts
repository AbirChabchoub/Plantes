import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from 'src/app/services/ads.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  ad: any;
  id: any;

  constructor(private activatedRoute: ActivatedRoute, private adsService: AdsService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adsService.getAdById(this.id).subscribe(
      (data) => {

        this.ad = data.ad;
        
        
      }
    )
  }

}
